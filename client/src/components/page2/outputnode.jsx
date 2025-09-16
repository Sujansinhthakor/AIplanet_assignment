import { Handle, Position } from "@xyflow/react";
import { FileOutput } from "lucide-react";
const OutputNode = ({ id, data }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm w-72 overflow-hidden">
      <div className="flex gap-2 items-center bg-gray-100 px-3 py-2 border-b border-gray-200">
        <FileOutput size={18} />
        <span className="font-bold text-gray-800">Output</span>
      </div>

      <div className="bg-blue-50 text-gray-700 text-sm px-3 py-1 border-b border-gray-200">
        {"Output of the result nodes as text"}
      </div>

      <div className="p-3">
        <div
          htmlFor={`user-query-${id}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Output Text
        </div>
        <textarea
          id={`user-query-${id}`}
          placeholder={"Output will be generated based on your query"}
          className="w-full min-h-[60px] border border-gray-300 rounded-md p-2 text-sm text-gray-700 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="pl-3 pb-2 text-xs font-medium text-gray-500">Output</div>
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ top: "192px", width: "10px", height: "10px" }}
        className="!bg-blue-500"
      />
    </div>
  );
};
export default OutputNode;
