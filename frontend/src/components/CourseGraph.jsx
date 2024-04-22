import { useEffect, useCallback, useState } from 'react';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    Background
} from 'reactflow';
import '../styles/graph.css';
import 'reactflow/dist/style.css';
import { getLayoutedElements } from '../utils/layout';
import CustomEdge from '../styles/CustomEdge.jsx';
// import { EditBar } from './EditBar.jsx';
/*
    Edit bar is an old UI component in which you had buttons for some deprecated operations (such as adding a course), which are not functional any longer.
    It is not used at all in the current version, so you have two options:
        1. Remove the EditBar and EditWindow components, and remove these commented lines and start clean.
        2. Continue off from those components and modify them as you see fit. This may be useful if you want a quick start.
*/

const CourseGraph = ({ axiosInstance, courses, setIsSidebarOpen, setSelectedCourseName, savePositions }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    // const [editBarState, setEditBarState] = useState(false);
    const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);
    const [reactflowInstance, setReactflowInstance] = useState(null);

    const openInfoBox = () => {
        if(isInfoBoxOpen) {
            setIsInfoBoxOpen(false);
        } else {
            setIsInfoBoxOpen(true);
        }
    };
    
    const closeInfoBox = () => {
        setIsInfoBoxOpen(false);
      };

    const onLayout = useCallback((newNodes, newEdges) => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);
        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
    }, [setNodes, setEdges]);

    useEffect(() => {
        if (courses.length > 0) {
            const newNodes = courses.map(course => course.createNode({ x: 0, y: 0 }));
            const newEdges = courses.flatMap(course => {
                return course.createEdges().map(edge => ({
                    ...edge,
                    //animated: true If anybody needs this later, leaving it here
                }));
            });

            setNodes(newNodes);
            setEdges(newEdges);

            onLayout(newNodes, newEdges);
        }
    }, [courses, onLayout, setNodes, setEdges]);


    useEffect(() => {
        getLayoutedElements(nodes, edges);
    }, []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onNodeClick = async (event, node) => {
        setSelectedCourseName(node.data.name);
        setIsSidebarOpen(true);
    };

    // const toggleEdit = async () => {
    //     if (!editBarState) {
    //         setEditBarState(true);
    //     }
    //     else {
    //         setEditBarState(false);
    //     }
    // };

    const disabled = true;

    const onSave = useCallback(() => {
        if (reactflowInstance) {
            const flow = reactflowInstance.toObject();
            const positions  = flow.nodes.map(node => {
                return {id: node.id, position: node.position}
                }
            );
            savePositions(positions);
        };        
      }
    );

    useEffect( () => {
        if (savePositions === undefined) {
            return;
        }
        onSave();
    }, [nodes])


    return (
        <div className='reactflow-wrapper'>
            {/* <EditBar state={editBarState} axios={axiosInstance} courses={onCoursesUpdated} onLayout={onLayout}/> */}
            {/* <button onClick={() => toggleEdit()} className='edit'>Edit</button> */}

            <CustomEdge />
            <ReactFlow
                minZoom={0.01}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onInit={setReactflowInstance}
                
                edgesUpdatable={!disabled}
                edgesFocusable={!disabled}
                nodesDraggable={!disabled}
                nodesConnectable={!disabled}
                nodesFocusable={!disabled}
                draggable={!disabled}
                elementsSelectable={!disabled}
            >
                <Controls />
                <Background color="#555" gap={32} />

            </ReactFlow>

        </div>
    );
};

export default CourseGraph;
