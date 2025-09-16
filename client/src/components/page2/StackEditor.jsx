import { useRecoilValue, useSetRecoilState } from "recoil";
import ReactFlowCanvas from "./reactflow";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  FolderPen,
  TextAlignJustify,
  FileInput,
  Sparkles,
  BookOpen,
  FileOutput,
} from "lucide-react";
import nodeAtom from "../../store/atoms/nodes";
import { useParams } from "react-router-dom";
import myError from "../../store/atoms/error";
import { useEffect } from "react";
import GenAiChat from "./genaichat";
import isChat from "../../store/atoms/showchat";
const StackEditor = () => {
  const notify = () =>
    toast.error("Compoents or Eges are not in correct order", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  const isShowError = useRecoilValue(myError);
  const setShowError = useSetRecoilState(myError);
  const id = useParams();
  const setNodes = useSetRecoilState(nodeAtom);

  const showChat = useRecoilValue(isChat);
  const setShowChat = useSetRecoilState(isChat);

  useEffect(() => {
    if (isShowError) {
      notify();
    }
    return () => {
      setShowError(false);
    };
  }, [isShowError == true]);
  return (
    <>
      <div className="w-screen h-screen">
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <div className="flex justify-between pt-2 px-2 h-[7%]  pb-2 bg-white border-b border-gray-300">
          <div className="flex items-center gap-2">
            <div>
              <img src="/logo.png" alt="AI planet" className="w-8" />
            </div>
            <div className="font-semibold text-xl">GenAI Stack</div>
          </div>
          <div>
            <img src="/image.png" alt="" className="rounded-full w-8" />
          </div>
        </div>
        <div className="flex w-screen h-[90%]">
          <div className="w-1/7 border-r border-gray-300 px-5">
            <div className="flex gap-10 items-center bg-gray-200 w-fit px-2 py-1 mt-5 rounded-lg border-2 border-gray-300">
              <div className="font-semibold">Chat with AI</div>
              <div>
                <FolderPen size={18} />
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <div>Componenets</div>

              {/*  Input Node  */}
              <div
                onClick={() => {
                  setNodes((oldNodes) => [
                    ...oldNodes,
                    {
                      id: "n1",
                      type: "userQuery",
                      position: { x: 100, y: 100 },
                    },
                  ]);
                }}
                className="mt-2 border-2 border-gray-200 rounded-lg px-2 py-1 hover:cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div>
                      <FileInput size={16} />
                    </div>
                    <div>Input</div>
                  </div>
                  <div className="items-end">
                    <TextAlignJustify size={16} color="gray" />
                  </div>
                </div>
              </div>

              {/* Knowledge base */}
              <div
                onClick={() => {
                  setNodes((oldNodes) => [
                    ...oldNodes,
                    {
                      id: "n2",
                      type: "KnowledgeBase",
                      position: { x: 100, y: 100 },
                      data: {
                        apikey: "",
                      },
                    },
                  ]);
                }}
                className="mt-2 border-2 border-gray-200 rounded-lg px-2 py-1 hover:cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div>
                      <BookOpen size={16} />
                    </div>
                    <div>Knowledge Base</div>
                  </div>
                  <div className="items-end">
                    <TextAlignJustify size={16} color="gray" />
                  </div>
                </div>
              </div>

              {/* LLM */}
              <div
                onClick={() => {
                  setNodes((oldNodes) => [
                    ...oldNodes,
                    {
                      id: "n3",
                      type: "llm",
                      position: { x: 100, y: 100 },
                      data: {
                        apikey: "",
                      },
                    },
                  ]);
                }}
                className="mt-2 border-2 border-gray-200 rounded-lg px-2 py-1 hover:cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div>
                      <Sparkles size={16} />
                    </div>
                    <div>LLM</div>
                  </div>
                  <div className="items-end">
                    <TextAlignJustify size={16} color="gray" />
                  </div>
                </div>
              </div>

              {/* Output */}
              <div
                onClick={() => {
                  setNodes((oldNodes) => [
                    ...oldNodes,
                    {
                      id: "n4",
                      type: "outputquery",
                      position: { x: 100, y: 100 },
                      data: {},
                    },
                  ]);
                }}
                className="mt-2 border-2 border-gray-200 rounded-lg px-2 py-1 hover:cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div>
                      <FileOutput size={16} />
                    </div>
                    <div>Output</div>
                  </div>
                  <div className="items-end">
                    <TextAlignJustify size={16} color="gray" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-6/7">
            <ReactFlowCanvas id={id} />
          </div>
        </div>
        <GenAiChat isOpen={showChat} onClose={() => setShowChat(false)} />
      </div>
    </>
  );
};
export default StackEditor;
