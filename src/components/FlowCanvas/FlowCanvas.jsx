import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

// Import registry and panels
import { nodeTypes } from "../nodes/index";
import NodesPanel from "../panels/NodesPanel";
import SettingsPanel from "../panels/SettingsPanel";

// Main FlowCanvas: keeps canvas logic, handlers, and validation in one place

export default function FlowCanvas() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeText, setNodeText] = useState("");
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

  // onConnect: add edge but enforce "single outgoing per source" rule
  const onConnect = useCallback(
    (params) => {
      const sourceHasEdge = edges.some((edge) => edge.source === params.source);
      if (sourceHasEdge) {
        alert("A source handle can only have one outgoing edge!");
        return;
      }
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed },
            style: { stroke: "#1fca67ff", strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [edges, setEdges]
  );

  // Node click -> open settings
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setNodeText(node.data?.label || "");
  }, []);

  const onPaneClick = useCallback(() => setSelectedNode(null), []);

  // Update selected node text
  const handleNodeTextChange = (text) => {
    setNodeText(text);
    if (!selectedNode) return;

    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, label: text } }
          : n
      )
    );
  };

  // Drag handlers for NodesPanel
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: `node_${idCounter}`,
        type,
        position,
        data: { label: `Message ${idCounter}` },
      };
      setNodes((nds) => nds.concat(newNode));
      setIdCounter((c) => c + 1);
    },
    [reactFlowInstance, idCounter, setNodes]
  );

  // Save with validation: error if more than one nodes AND more than one node has NO incoming edges
  const handleSave = () => {
    if (nodes.length <= 1) {
      alert("Flow saved! (single node or empty)");
      console.log({ nodes, edges });
      return;
    }

    const nodesWithoutIncoming = nodes.filter(
      (n) => !edges.some((e) => e.target === n.id)
    );
    if (nodesWithoutIncoming.length > 1) {
      alert(
        "Error: Multiple nodes have empty target handles (no incoming connections)."
      );
      return;
    }

    alert("Flow saved!");
    console.log({ nodes, edges });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          borderRight: "1px solid #e5e7eb",
          background: "#fff",
          position: 'relative', // ensures sidebar sits above canvas
          zIndex: 10,
        }}
      >
        {!selectedNode ? (
          <NodesPanel onDragStart={onDragStart} />
        ) : (
          <SettingsPanel
            selectedNode={selectedNode}
            nodeText={nodeText}
            setNodeText={handleNodeTextChange}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </div>

      <div style={{ flexGrow: 1, position: "relative" }} ref={reactFlowWrapper}>
        <div
          style={{
            height: 64,
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            background: "#f9fafb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* <div style={{ fontWeight: 700 }}>NOOR</div> */}
            <div style={{ color: "#6b7280" }}>Chatbot Flow Builder</div>
          </div>
          <div>
            <button
              onClick={handleSave}
              style={{
                background: "#2563eb",
                color: "white",
                padding: "8px 14px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          style={{ width: "100%", height: "100%" }}
          defaultEdgeOptions={{
            style: { strokeWidth: 2, stroke: "#267d36ff" },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
          }}
        >
          <Controls />
          <Background
            variant="dots"
            gap={16}
            size={0.5}
            color="#d1d5db"
            style={{ background: "#fafafa" }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
