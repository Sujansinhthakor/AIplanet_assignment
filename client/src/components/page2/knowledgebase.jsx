import { Handle, Position } from "@xyflow/react";
import { Database, Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const KnowledgeBaseNode = ({ id, data }) => {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [openaiApiKey, setopenaiApiKey] = useState();

  useEffect(() => {
    console.log(openaiApiKey);
  }, [openaiApiKey]);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post("http://127.0.0.1:8000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "openai-api-key": openaiApiKey,
          },
        });
        console.log(res.data);
        alert("File uploaded successfully!");
      } catch (err) {
        console.error(err);
        alert("Upload failed");
      }
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm w-80 overflow-hidden font-sans">
      <div className="flex gap-2 items-center bg-gray-100 px-3 py-2 border-b border-gray-200">
        <Database size={18} />
        <span className="font-bold text-gray-800">Knowledge Base</span>
      </div>

      <div className="bg-blue-50 text-gray-700 text-sm px-3 py-1 border-b border-gray-200">
        Let LLM search info in your file
      </div>

      <div className="p-3 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          File for Knowledge Base
        </label>

        <div
          onClick={handleFileClick}
          className="border-2 border-dashed rounded-md p-3 text-center text-gray-400 text-sm cursor-pointer hover:bg-gray-50"
        >
          {fileName ? (
            <span className="text-gray-700">{fileName}</span>
          ) : (
            "Upload File ⬆️"
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="p-3 border-b border-gray-200">
        <label
          htmlFor={`embedding-model-${id}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Embedding Model
        </label>
        <select
          id={`embedding-model-${id}`}
          className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          defaultValue={data.embeddingModel || "text-embedding-3-large"}
        >
          <option value="text-embedding-3-large">text-embedding-3-large</option>
          <option value="text-embedding-3-small">text-embedding-3-small</option>
        </select>
      </div>

      <div className="p-3">
        <label
          htmlFor={`api-key-${id}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          API Key
        </label>
        <div className="flex items-center border border-gray-300 rounded-md">
          <input
            onChange={(e) => setopenaiApiKey(e.target.value)}
            type={apiKeyVisible ? "text" : "password"}
            id={`api-key-${id}`}
            placeholder="********************"
            defaultValue={data.apiKey || ""}
            className="flex-1 p-2 text-sm text-gray-700 focus:outline-none"
          />
          <button
            type="button"
            className="px-2 text-gray-500 hover:text-gray-700"
            onClick={() => setApiKeyVisible(!apiKeyVisible)}
          >
            {apiKeyVisible && <Eye />}
            {!apiKeyVisible && <EyeOff />}
          </button>
        </div>
      </div>

      <div className="font-semibold flex justify-between text-xs text-gray-500 px-3 pb-2">
        <span>Query</span>
        <span>Context</span>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="query"
        style={{ top: "346px", width: "10px", height: "10px" }}
        className="!bg-orange-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="context"
        style={{ top: "346px", width: "10px", height: "10px" }}
        className="!bg-orange-500"
      />
    </div>
  );
};

export default KnowledgeBaseNode;
