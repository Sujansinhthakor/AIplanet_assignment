import { Handle, Position } from "@xyflow/react";
import { FileInput } from "lucide-react";
const UserQueryNode = ({ id }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm w-72 overflow-hidden font-sans">
      <div className="flex gap-2 items-center bg-gray-100 px-3 py-2 border-b border-gray-200">
        <FileInput size={18} />
        <span className="font-bold text-gray-800">User Query</span>
      </div>

      <div className="bg-blue-50 text-gray-700 text-sm px-3 py-1 border-b border-gray-200">
        {"Enter point for queries"}
      </div>

      <div className="p-3">
        <div
          htmlFor={`user-query-${id}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          User Query
        </div>
        <textarea
          id={`user-query-${id}`}
          placeholder={"Write your query here"}
          className="w-full min-h-[60px] border border-gray-300 rounded-md p-2 text-sm text-gray-700 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="text-right pr-3 pb-2 text-xs text-gray-500">Query</div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: "193px", width: "10px", height: "10px" }}
        className="!bg-blue-500"
      />
    </div>
  );
};
export default UserQueryNode;
