import { MessageCircle, Play, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import nodeAtom from "../../store/atoms/nodes";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import edgeAtom from "../../store/atoms/edges";
import myError from "../../store/atoms/error";
import isChat from "../../store/atoms/showchat";
const CanvasButton = () => {
  const [buildButton, setBuildButton] = useState(false);
  const [chatdButton, setChatdButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const nodes = useRecoilValue(nodeAtom);
  const edges = useRecoilValue(edgeAtom);
  const setShowChat = useSetRecoilState(isChat);
  const setError = useSetRecoilState(myError);

  const handleOnClick = async () => {
    setLoader(true);
    const res = await axios.post("http://127.0.0.1:8000/validate-edge", edges);
    setLoader(false);
    console.log(res.data.valid);
    if (res.data.valid == false) {
      setError(true);
    } else setChatdButton(true);
  };
  useEffect(() => {
    if (nodes.length > 0) setBuildButton(true);
  }, [nodes]);

  return (
    <div className="absolute bottom-0 right-0 flex flex-col gap-2 px-5">
      <div
        onClick={handleOnClick}
        className={`bg-green-500 p-3 rounded-full ${
          !buildButton ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {!loader && <Play size={30} color="white" />}
        {loader && (
          <div className="animate-spin">
            <LoaderCircle size={30} />
          </div>
        )}
      </div>
      <div
        onClick={() => setShowChat(true)}
        className={`bg-blue-500 p-3 rounded-full ${
          !chatdButton ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <MessageCircle size={30} color="white" />
      </div>
    </div>
  );
};
export default CanvasButton;
