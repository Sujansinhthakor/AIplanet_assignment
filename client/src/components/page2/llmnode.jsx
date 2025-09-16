import { Handle, Position } from "@xyflow/react";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const LLMNode = ({ id, data }) => {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [serpKeyVisible, setSerpKeyVisible] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm w-96 overflow-hidden font-sans">
      <div className="flex gap-2 items-center bg-gray-100 px-3 py-2 border-b border-gray-200">
        <Sparkles size={18} />
        <span className="font-bold text-gray-800">LLM (OpenAI)</span>
      </div>

      <div className="bg-blue-50 text-gray-700 text-sm px-3 py-1 border-b border-gray-200">
        Run a query with OpenAI LLM
      </div>

      <div className="p-3 border-b border-gray-200">
        <label
          htmlFor={`model-${id}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Model
        </label>
        <select
          id={`model-${id}`}
          className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          defaultValue={data.model || "gpt-4o-mini"}
        >
          <option value="gpt-4o-mini">GPT 4o- Mini</option>
          <option value="gpt-4o">GPT 4o</option>
          <option value="gpt-3.5">GPT 3.5</option>
        </select>
      </div>

      <div className="p-3 border-b border-gray-200">
        <label
          htmlFor={`api-key-${id}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          API Key
        </label>
        <div className="flex items-center border border-gray-300 rounded-md">
          <input
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

      <div class="p-3 border-b border-gray-200">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Prompt
        </label>
        <div class="w-full border border-gray-300 rounded-md p-2 text-sm focus-within:ring-2 focus-within:ring-blue-300">
          <textarea
            defaultValue={
              "You are a helpful PDF assistant. Use web search if the PDF lacks context"
            }
            class="w-full min-h-[40px] text-gray-700 resize-y focus:outline-none bg-transparent"
          ></textarea>
          <div class="mt-2 ">
            <span class="font-medium text-purple-800 pr-1">Context:</span>
            <span>{"{context}"}</span>
          </div>
          <div class="mt-2">
            <span class="font-medium text-purple-800 pr-1">User Query:</span>
            <span>{"{query}"}</span>
          </div>
        </div>
      </div>

      <div className="p-3 border-b border-gray-200">
        <label
          htmlFor={`temperature-${id}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Temperature
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="1"
          defaultValue={0.75}
          className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          WebSearch Tool
        </label>
        <button
          type="button"
          onClick={() => setWebSearchEnabled(!webSearchEnabled)}
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
            webSearchEnabled ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              webSearchEnabled ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="p-3">
        <label
          htmlFor={`serp-api-${id}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          SERF API
        </label>
        <div className="flex items-center border border-gray-300 rounded-md">
          <input
            type={serpKeyVisible ? "text" : "password"}
            id={`serp-api-${id}`}
            placeholder="********************"
            defaultValue={data.serpApi || ""}
            className="flex-1 p-2 text-sm text-gray-700 focus:outline-none"
          />
          <button
            type="button"
            className="px-2 text-gray-500 hover:text-gray-700"
            onClick={() => setSerpKeyVisible(!serpKeyVisible)}
          >
            {serpKeyVisible && <Eye />}
            {!serpKeyVisible && <EyeOff />}
          </button>
        </div>
      </div>

      <div className="text-xs text-right font-medium text-gray-500 px-3 pb-2">
        Output
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="context"
        style={{ top: "350px", width: "10px", height: "10px" }}
        className="!bg-purple-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="query"
        style={{ top: "377px", width: "10px", height: "10px" }}
        className="!bg-purple-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ top: "635px", width: "10px", height: "10px" }}
        className="!bg-purple-500"
      />
    </div>
  );
};

export default LLMNode;
