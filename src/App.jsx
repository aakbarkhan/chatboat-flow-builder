
import { ReactFlowProvider } from 'reactflow';
import FlowCanvas from './components/FlowCanvas/FlowCanvas';


export default function App() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}