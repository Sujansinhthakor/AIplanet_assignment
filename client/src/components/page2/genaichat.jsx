import axios from "axios";
import { X, SendHorizontal, Bot, User } from "lucide-react";
import { useRef, useState } from "react";
const GenAiChat = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [chats, setChats] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const showLoader =
    chats && chats.length > 0 && chats[chats.length - 1].type === "user";
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOnClick = async () => {
    if (
      inputValue.length > 0 &&
      (chats == undefined || chats.at(chats.length - 1)?.type != "user")
    ) {
      setChats((prev) => [...prev, { text: inputValue, type: "user" }]);
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          query: inputValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "openai-api-key":
              "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",
          },
        }
      );
      setChats((prev) => [...prev, { text: res.data.response, type: "bot" }]);
      setInputValue("");
    }
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-black/50 z-50">
        <div className="bg-white w-[80%] h-[90%] mx-10 rounded-2xl">
          <div className="flex justify-between items-center px-10 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div>
                <img className="w-10" src="/logo.png" alt="" />
              </div>
              <div className="font-semibold">GenAI Stack Chat</div>
            </div>
            <div
              onClick={onClose}
              className="hover:cursor-pointer hover:scale-110"
            >
              <X />
            </div>
          </div>
          {/*  */}
          {chats.length == 0 && (
            <div className="flex flex-col justify-center items-center w-full h-[80%]">
              <div className="flex items-center gap-2">
                <div>
                  <img className="w-8" src="/logo.png" alt="" />
                </div>
                <div className="font-semibold">GenAI Stack Chat</div>
              </div>
              <div className="font-medium text-gray-500 pt-2">
                Start a conversion to test your Stack
              </div>
            </div>
          )}
          {chats.length > 0 && (
            <div className="flex flex-col gap-2 w-full h-[80%] font-sans">
              {chats?.map((chat, index) => (
                <div key={index} className="p-4 justify-center">
                  <div className="text-md">
                    <div className="flex gap-1">
                      <div>
                        {chat.type == "user" ? (
                          <div className="bg-blue-400 p-1 rounded-md">
                            <User color="white" />
                          </div>
                        ) : (
                          <div className="bg-green-400 p-1 rounded-md">
                            <Bot color="white" />
                          </div>
                        )}
                      </div>
                      <div>{chat.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="w-full h-[10%] px-5 pb-5">
            <div className="mb-2 flex justify-between items-center w-full h-full rounded-md border-2 border-gray-300 px-5">
              <div className="w-full">
                <input
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleOnClick();
                  }}
                  value={`${inputValue}`}
                  className="w-[95%] focus:ring-0 outline-0 "
                  type="text"
                  name=""
                  id=""
                  placeholder="Send a Message"
                />
              </div>
              <div onClick={handleOnClick} className="hover:cursor-pointer">
                <SendHorizontal size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GenAiChat;
