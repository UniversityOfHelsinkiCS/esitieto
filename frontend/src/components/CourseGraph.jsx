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
import {
    addCourse, removeCourse, handleSearch, // Courses from database
    handleAddDependency, handleRemoveDependency, // Dependencies from database
    handleKORIAPITEST, handleFetchKORIByName, handleFetchKORICourseInfo, // Kori
} from './CourseFunctions';
import {InfoBox} from './InfoBox.jsx'

const CourseGraph = ({ axiosInstance, courses, onCoursesUpdated, setIsSidebarOpen, setSelectedCourseName }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [editBarState, setEditBarState] = useState(false);
    const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);

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
    }, [courses, onLayout]);


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
        console.log("Selected course: ", node.data.label);
    };

    const toggleEdit = async () => {
        if (!editBarState) {
            setEditBarState(true);
        }
        else {
            setEditBarState(false);
        }
    }

    const EditBar = () => {
        if (editBarState===true) {
            return (
                <div>
                <button onClick={() => onLayout(nodes, edges)}>Auto Layout</button>
                <button onClick={() => addCourse(axiosInstance, onCoursesUpdated)}>Add Course</button>
                <button onClick={() => removeCourse(axiosInstance, onCoursesUpdated)}>Remove Course</button>
                <button onClick={() => handleAddDependency(axiosInstance)}>Add Dependency</button>
                <button onClick={() => handleRemoveDependency(axiosInstance)}>Remove Dependency</button>
                <button onClick={() => handleSearch(axiosInstance, onCoursesUpdated)}>Search Course</button>
                <button onClick={() => handleKORIAPITEST(axiosInstance)}>KORIAPI TEST</button>
                </div>
            )
        }
    }

    return (
        <div className='reactflow-wrapper'>
            <EditBar state = {editBarState} />
            <button onClick={openInfoBox}>Info</button>
            <button onClick={() => toggleEdit()} className='edit'>Edit</button>
            <InfoBox isOpen={isInfoBoxOpen} onClose={closeInfoBox} />

            <CustomEdge />
            <ReactFlow

                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
            >
                <Controls />
                <Background color="#555" gap={32} />

            </ReactFlow>

        </div>
    );
};

export default CourseGraph;