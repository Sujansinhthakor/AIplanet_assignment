from fastapi import FastAPI, UploadFile, File, HTTPException,Header
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import tempfile
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings,ChatOpenAI
from langchain_qdrant import Qdrant
from qdrant_client import QdrantClient
from typing import List
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser


app = FastAPI()

class EdgeData(BaseModel):
    source: str
    sourceHandle: str
    target: str
    targetHandle: str
    id: str

class QueryRequest(BaseModel):
    query: str
# Allow frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


qdrant = QdrantClient(host="localhost", port=6333)


@app.post("/validate-edge")
async def validate_edge(edges: List[EdgeData]):
   
    print("Received edge data:", edges)

    if not any(e.source == "n1" for e in edges):
        return {"valid": False, "reason": "No edge with source 'n1' found."}

    if any(e.source == "n3" and e.target == "n2" for e in edges):
        return {"valid": False, "reason": "Edge from 'n3' to 'n2' is present (disallowed)."}

    if len(edges) > 0 and all(e.source == "n1" and e.target == "n2" for e in edges):
        return {
            "valid": False,
            "reason": "The only edges present are source='n1' -> target='n2' (disallowed)."
        }

    return {"valid": True, "reason": "Validation passed."}

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...),
                      openai_api_key: str = Header(...)):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        
        loader = PyPDFLoader(tmp_path)
        docs = loader.load()

        embeddings = OpenAIEmbeddings(
        model="text-embedding-3-large",
        openai_api_key=openai_api_key)
        qdrant_store = Qdrant.from_documents(
            documents=docs,
            embedding=embeddings,
            url="http://localhost:6333",  
            collection_name="pdf_knowledge_base"
        )

        return {"status": "success", "message": f"Inserted {len(docs)} documents"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: QueryRequest,
               openai_api_key: str = Header(...)):
    
    print("reacher here")
    try:
        
        embeddings = OpenAIEmbeddings(
            model="text-embedding-3-large",
            openai_api_key=openai_api_key
        )

      
        vector_store = Qdrant(
            client=qdrant,
            collection_name="pdf_knowledge_base",
            embeddings=embeddings
        )
        retriever = vector_store.as_retriever()
        
       
        llm = ChatOpenAI(
            model="gpt-4o",  
            openai_api_key=openai_api_key,
            temperature=0
        )
        
      
        template = """You are an assistant for question-answering tasks.
        Use the following pieces of retrieved context to answer the question.
        
        Question: {query}
        Context: {context}
        
        Answer:"""
        prompt = ChatPromptTemplate.from_template(template)

        
        rag_chain = (
            {"context": retriever, "query": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )

        
        answer = rag_chain.invoke(request.query)

        return {"status": "success", "response": answer}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))