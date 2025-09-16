import { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  useReactFlow,
  ReactFlowProvider,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import UserQueryNode from "./inputnode";
import { useRecoilValue, useSetRecoilState } from "recoil";
import nodeAtom from "../../store/atoms/nodes";
import edgeAtom from "../../store/atoms/edges";
import OutputNode from "./outputnode";
import KnowledgeBaseNode from "./knowledgebase";
import LLMNode from "./llmnode";
import CanvasButton from "./canvasbutton";
const proOptions = { hideAttribution: true };

const ReactFlowEditor = ({ id }) => {
  const nodes = useRecoilValue(nodeAtom);
  const setNodes = useSetRecoilState(nodeAtom);
  const edges = useRecoilValue(edgeAtom);
  const setEdges = useSetRecoilState(edgeAtom);
  const [isLoaded, setIsLoaded] = useState(false); // Add loading state

  const { getNodes, getEdges } = useReactFlow();
  const en = getNodes();
  const em = getEdges();

  // console.log(edges);
  // const [edges, setEdges] = useState([
  //   { id: "n1-n2", source: "n1", target: "n2" },
  // ]);
  useEffect(() => {
    if (localStorage.getItem(`nodes_${id.id}`)) {
      const a = localStorage.getItem(`nodes_${id.id}`);
      setNodes(JSON.parse(a));
    }
    if (localStorage.getItem(`edges_${id.id}`)) {
      const a = localStorage.getItem(`edges_${id.id}`);
      setEdges(JSON.parse(a));
    }
    setIsLoaded(true);

    return () => {
      setNodes([]);
      setEdges([]);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const a = `nodes_${id.id}`;
    localStorage.setItem(a, JSON.stringify(nodes));

    const b = `edges_${id.id}`;
    localStorage.setItem(b, JSON.stringify(edges));
  }, [nodes, edges, isLoaded]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const nodeTypes = {
    userQuery: UserQueryNode,
    outputquery: OutputNode,
    KnowledgeBase: KnowledgeBaseNode,
    llm: LLMNode,
  };

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={proOptions}
      >
        <Background bgColor="#f3f4f6" />
        <Controls position="bottom-center" orientation="horizontal" />
        <Panel position="bottom-right">
          <div className="relative w-full h-full cursor-pointer">
            <CanvasButton />
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

const ReactFlowCanvas = ({ id }) => {
  return (
    <ReactFlowProvider>
      <ReactFlowEditor id={id} />
    </ReactFlowProvider>
  );
};
export default ReactFlowCanvas;
