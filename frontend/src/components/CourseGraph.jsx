import { useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider
} from 'reactflow';
import '../styles/graph.css';


const initialNodes = [
    { 
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Tietorakenteet ja algoritmit I' },
        style: { border: '1px solid #777',
        padding: 10,
        backgroundColor: '#fff' }, 
    },
    {
        id: '2',
        position: { x: 0, y: 100 },
        data: { label: 'Tietorakenteet ja algoritmit II' },
        style: { border: '1px solid #777',
        padding: 10,
        backgroundColor: '#fff' },
    },
];

const CourseGraph = () => {
  return (
    <div className='reactflow-wrapper'>
      <ReactFlow nodes={initialNodes}/>
    </div>
  );
};

export default CourseGraph;
