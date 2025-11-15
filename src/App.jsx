// import React, { useState, useCallback, useRef } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls,
//   Background,
//   MarkerType,
//   Handle,
//   Position,
// } from 'reactflow';
// import 'reactflow/dist/style.css';

// // Custom Text Node Component

// const TextNode = ({ data, selected }) => {
//   return (
//     <div
//       style={{
//         padding: '10px',
//         border: `2px solid ${selected ? '#3b82f6' : '#e5e7eb'}`,
//         borderRadius: '8px',
//         background: 'white',
//         minWidth: '200px',
//         boxShadow: selected ? '0 4px 6px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
//         position: "relative",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           marginBottom: '8px',
//           paddingBottom: '8px',
//           borderBottom: '1px solid #e5e7eb',
//           fontSize: '12px',
//           fontWeight: '600',
//           color: '#6b7280',
//         }}
//       >
//         <span>💬</span>
//         <span>Send Message</span>
//       </div>

//       {/* Message Content */}
//       <div style={{ fontSize: '14px', color: '#374151' }}>
//         {data.label || 'Enter message...'}
//       </div>

//       {/* Source Handle */}
//       <Handle
//         type="source"
//         position={Position.Right}
//         id="source"
//         style={{
//           background: '#3b82f6',
//           width: '12px',
//           height: '12px',
//           borderRadius: '50%',
//           border: '2px solid white',
//           right: '-6px',
//         }}
//       />

//       {/* Target Handle */}
//       <Handle
//         type="target"
//         position={Position.Left}
//         id="target"
//         style={{
//           background: '#3b82f6',
//           width: '12px',
//           height: '12px',
//           borderRadius: '50%',
//           border: '2px solid white',
//           left: '-6px',
//         }}
//       />
//     </div>
//   );
// };

// // Define node types
// const nodeTypes = {
//   textNode: TextNode,
// };

// // Main App Component
// function ChatbotFlowBuilder() {
//   const reactFlowWrapper = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [nodeText, setNodeText] = useState('');
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);
//   const [nodeIdCounter, setNodeIdCounter] = useState(1);

//   // Handle edge connection with validation (only one edge from source)
//   const onConnect = useCallback(
//     (params) => {
//       // Check if source handle already has an edge
//       const sourceHasEdge = edges.some(
//         (edge) => edge.source === params.source
//       );

//       if (sourceHasEdge) {
//         alert('A source handle can only have one outgoing edge!');
//         return;
//       }

//       // Add edge with arrow marker
//       setEdges((eds) =>
//         addEdge(
//           {
//             ...params,
//             markerEnd: { type: MarkerType.ArrowClosed },
//             style: { stroke: '#3b82f6', strokeWidth: 2 },
//           },
//           eds
//         )
//       );
//     },
//     [edges, setEdges]
//   );

//   // Handle node selection
//   const onNodeClick = useCallback((event, node) => {
//     setSelectedNode(node);
//     setNodeText(node.data.label || '');
//   }, []);

//   // Handle canvas click (deselect node)
//   const onPaneClick = useCallback(() => {
//     setSelectedNode(null);
//   }, []);

//   // Update node text in settings panel
//   const handleTextChange = (e) => {
//     const newText = e.target.value;
//     setNodeText(newText);

//     // Update the node in real-time
//     setNodes((nds) =>
//       nds.map((node) => {
//         if (node.id === selectedNode.id) {
//           return {
//             ...node,
//             data: { ...node.data, label: newText },
//           };
//         }
//         return node;
//       })
//     );
//   };

//   // Handle drag over event
//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'move';
//   }, []);

//   // Handle drop event to add new node
//   const onDrop = useCallback(
//     (event) => {
//       event.preventDefault();

//       const type = event.dataTransfer.getData('application/reactflow');

//       if (typeof type === 'undefined' || !type) {
//         return;
//       }

//       const position = reactFlowInstance.screenToFlowPosition({
//         x: event.clientX,
//         y: event.clientY,
//       });

//       const newNode = {
//         id: `node_${nodeIdCounter}`,
//         type: 'textNode',
//         position,
//         data: { label: `Message ${nodeIdCounter}` },
//       };

//       setNodes((nds) => nds.concat(newNode));
//       setNodeIdCounter((count) => count + 1);
//     },
//     [reactFlowInstance, nodeIdCounter, setNodes]
//   );

//   // Save flow with validation
//   const handleSave = () => {
//     // Validation: Check if more than one node exists
//     if (nodes.length <= 1) {
//       alert('Flow saved successfully!');
//       console.log('Nodes:', nodes);
//       console.log('Edges:', edges);
//       return;
//     }

//     // Find nodes with empty target handles (no incoming edges)
//     const nodesWithoutTarget = nodes.filter((node) => {
//       return !edges.some((edge) => edge.target === node.id);
//     });

//     // Error if more than one node has no incoming edge
//     if (nodesWithoutTarget.length > 1) {
//       alert('Error: Cannot save flow! Multiple nodes have empty target handles.');
//       return;
//     }

//     alert('Flow saved successfully!');
//     console.log('Nodes:', nodes);
//     console.log('Edges:', edges);
//   };

//   // Handle drag start from nodes panel
//   const onDragStart = (event, nodeType) => {
//     event.dataTransfer.setData('application/reactflow', nodeType);
//     event.dataTransfer.effectAllowed = 'move';
//   };

//   return (
//     <div style={{ 
//       display: 'flex', 
//       height: '100vh', 
//       width: '100vw',
//       fontFamily: 'Arial, sans-serif',
//       overflow: 'hidden',
//       position: 'fixed',
//       top: 0,
//       left: 0,
//     }}>
//       {/* Main Flow Canvas */}
//       <div style={{ 
//         flexGrow: 1, 
//         position: 'relative',
//         display: 'flex',
//         flexDirection: 'column',
//       }}>
//         {/* Header with Save Button */}
//         <div
//           style={{
//             height: '60px',
//             background: '#f3f4f6',
//             borderBottom: '1px solid #e5e7eb',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: '0 20px',
//             flexShrink: 0,
//           }}
//         >
//           <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>
//             Chatbot Flow Builder
//           </h2>
//           <button
//             onClick={handleSave}
//             style={{
//               padding: '10px 24px',
//               background: '#3b82f6',
//               color: 'white',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '600',
//               boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//             }}
//             onMouseOver={(e) => e.target.style.background = '#2563eb'}
//             onMouseOut={(e) => e.target.style.background = '#3b82f6'}
//           >
//             Save Changes
//           </button>
//         </div>

//         {/* React Flow Canvas */}
//         <div ref={reactFlowWrapper} style={{ flexGrow: 1, background: '#f9fafb' }}>
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             onNodeClick={onNodeClick}
//             onPaneClick={onPaneClick}
//             onInit={setReactFlowInstance}
//             onDrop={onDrop}
//             onDragOver={onDragOver}
//             nodeTypes={nodeTypes}
//             fitView
//             style={{ background: '#f9fafb' }}
//           >
//             <Controls />
//             <Background variant="dots" gap={12} size={1} color="#d1d5db" />
//           </ReactFlow>
//         </div>
//       </div>

//       {/* Right Sidebar - Nodes Panel or Settings Panel */}
//       <div
//         style={{
//           width: '300px',
//           background: 'white',
//           borderLeft: '1px solid #e5e7eb',
//           padding: '20px',
//           overflowY: 'auto',
//           flexShrink: 0,
//         }}
//       >
//         {selectedNode ? (
//           /* Settings Panel - shown when a node is selected */
//           <div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
//               <button
//                 onClick={() => setSelectedNode(null)}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   fontSize: '18px',
//                   padding: '4px',
//                 }}
//               >
//                 ←
//               </button>
//               <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Message Settings</h3>
//             </div>

//             <div>
//               <label
//                 style={{
//                   display: 'block',
//                   fontSize: '12px',
//                   fontWeight: '600',
//                   color: '#6b7280',
//                   marginBottom: '8px',
//                 }}
//               >
//                 Text
//               </label>
//               <textarea
//                 value={nodeText}
//                 onChange={handleTextChange}
//                 placeholder="Enter message text..."
//                 style={{
//                   width: '100%',
//                   minHeight: '100px',
//                   padding: '10px',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '6px',
//                   fontSize: '14px',
//                   resize: 'vertical',
//                   fontFamily: 'Arial, sans-serif',
//                   boxSizing: 'border-box',
//                 }}
//               />
//             </div>
//           </div>
//         ) : (
//           /* Nodes Panel - shown when no node is selected */
//           <div>
//             <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600' }}>
//               Nodes Panel
//             </h3>
//             <div
//               draggable
//               onDragStart={(event) => onDragStart(event, 'textNode')}
//               style={{
//                 padding: '12px',
//                 border: '1px solid #3b82f6',
//                 borderRadius: '6px',
//                 cursor: 'grab',
//                 textAlign: 'center',
//                 background: '#eff6ff',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 gap: '8px',
//               }}
//             >
//               <div style={{ fontSize: '24px' }}>💬</div>
//               <div style={{ fontSize: '14px', fontWeight: '600', color: '#3b82f6' }}>
//                 Message
//               </div>
//               <div style={{ fontSize: '12px', color: '#6b7280' }}>
//                 Drag to add
//               </div>
//             </div>
//             <div style={{ marginTop: '16px', fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>
//               Drag and drop the message node onto the canvas to start building your chatbot flow.
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Wrap with ReactFlowProvider
// export default function App() {
//   return (
//     <ReactFlowProvider>
//       <ChatbotFlowBuilder />
//     </ReactFlowProvider>
//   );
// }

import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import FlowCanvas from './components/FlowCanvas/FlowCanvas';


export default function App() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}