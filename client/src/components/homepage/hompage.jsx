import { useState } from "react";
// import "./App.css";
import { Plus, ExternalLink } from "lucide-react";
import MakeStack from "../page2/StackEditor";
import { useRecoilState, useRecoilValue } from "recoil";
import Popup from "./popup";
import myStackAtom from "../../store/atoms/mystacks";
import PrimaryButton from "../primarybutton";
import GenAiChat from "../page2/genaichat";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const myStacks = useRecoilValue(myStackAtom);

  return (
    <>
      {/* <div>
        <MakeStack />
      </div> */}

      <div className="w-screen h-screen bg-zinc-100">
        <div className="flex justify-between pt-2 px-2 shadow-md pb-2 bg-white">
          <div className="flex items-center gap-2">
            <div>
              <img src="/logo.png" alt="AI planet" className="w-10" />
            </div>
            <div className="font-semibold text-xl">GenAI Stack</div>
          </div>
          <div>
            <img src="/image.png" alt="" className="rounded-full w-10" />
          </div>
        </div>
        <div className="flex-col gap-5 px-10 pt-5">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-2xl">My Stacks</div>
            <div>
              <PrimaryButton
                icon={<Plus size={20} />}
                text={"New Stack"}
                onClick={() => setIsPopupOpen(true)}
              ></PrimaryButton>
            </div>
          </div>
          <div className="bg-[#E4E8EE] h-[2px] mt-4 "></div>
        </div>

        {myStacks.length > 0 && (
          <div className="grid grid-cols-4 py-2">
            {myStacks.map((stack, index) => (
              <div
                key={index}
                className="flex flex-col justfiy-end  bg-white p-5 rounded-2xl shadow-md hover:shadow-lg cursor-pointer w-80 m-5 gap-10"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-lg">{stack.name}</div>
                  </div>
                  <div className="text-sm text-zinc-500 font-semibold mt-2">
                    {stack.description}
                  </div>
                </div>
                <div className="flex justify-end ">
                  <div
                    onClick={() => navigate(`/stack/${index}`)}
                    className="flex justify-end items-center gap-2 p-2 border border-gray-300 rounded-md"
                  >
                    <div className="font-semibold">Edit Stack</div>
                    <ExternalLink size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {myStacks.length === 0 && (
          <div className="flex justify-center items-center mt-20">
            <div className="flex flex-col gap-3 bg-white w-96 py-5 px-8 border border-[#E4E8EE] m-10 rounded-3xl shadow-md">
              <div className="text-xl font-semibold">Create New Stack</div>
              <div className="text-sm font-semibold text-zinc-500 text-balance">
                Start building your generative AI apps with our essential tools
                and frameworks
              </div>
              <div className="pt-3">
                <PrimaryButton
                  icon={<Plus size={20} />}
                  text={"New Stack"}
                  onClick={() => setIsPopupOpen(true)}
                ></PrimaryButton>
              </div>
            </div>
          </div>
        )}
        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </div>
    </>
  );
}

export default Homepage;
