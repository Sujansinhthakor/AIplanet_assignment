import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import myStackAtom from "../../store/atoms/mystacks";

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const nameref = useRef(null);
  const desref = useRef(null);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleInputChange = () => {
    if (nameref.current.value.length && desref.current.value.length) {
      setButtonDisabled(false);
    } else setButtonDisabled(true);
  };

  const setMyStacks = useSetRecoilState(myStackAtom);
  const handleOnSubmit = () => {
    if (!buttonDisabled) {
      setMyStacks((prev) => [
        ...prev,
        {
          name: nameref.current.value,
          description: desref.current.value,
        },
      ]);
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[450px]">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Create New Stack</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black hover:cursor-pointer"
          >
            <X />
          </button>
        </div>

        <div className="border border-gray-200 mb-6 -mx-6" />

        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 text-sm font-medium">Name</div>
            <input
              onChange={handleInputChange}
              ref={nameref}
              type="text"
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>
          <div>
            <div className="mb-2 text-sm font-medium">Description</div>
            <textarea
              onChange={handleInputChange}
              ref={desref}
              rows={5}
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-3 ">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleOnSubmit}
              className={`px-6 py-2 bg-[#44924C] text-white rounded-lg ${
                buttonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:cursor-pointer"
              }`}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
