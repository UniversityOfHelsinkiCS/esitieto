import React, { useState, useCallback } from 'react';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    Background
} from 'reactflow';
import '../styles/graph.css';
import 'reactflow/dist/style.css';
import { mandatoryCourse, optionalCourse, completedCourse, mandatoryEdge, optionalEdge } from '../styles/courseStyles';

const initialNodes = [
    { 
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Tietorakenteet ja algoritmit II' },
        style: mandatoryCourse
    },
    {
        id: '2',
        position: { x: 0, y: 100 },
        data: { label: 'Tietorakenteet ja algoritmit I' },
        style: completedCourse
    },
    {
        id: '3',
        position: { x: -100, y: -100 },
        data: { label: 'Introduction to AI' },
        style: mandatoryCourse
    },
    {
        id: '4',
        position: { x: -200, y: 0 },
        data: { label: 'Todennäköisyyslaskenta I' },
        style: optionalCourse
    },
];

const initialEdges = [
    { id: 'e-1-2', source: '1', target: '2', style: mandatoryEdge },
    { id: 'e-3-1', source: '3', target: '1', style: mandatoryEdge },
    { id: 'e-3-4', source: '3', target: '4', style: optionalEdge }
];

const CourseGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

    return (
        <div className='reactflow-wrapper'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <Background color="#555" gap={32} />
            </ReactFlow>
        </div>
    );
};

export default CourseGraph;
