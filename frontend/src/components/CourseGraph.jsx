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
    //addCourse, removeCourse, // Courses from database
    //handleAddDependency, handleRemoveDependency, // Dependencies from database
    handleKORIAPITEST, //handleFetchKORIByName, handleFetchKORICourseInfo, // Kori
} from '../functions/CourseFunctions.jsx';
import { InfoBox } from './InfoBox.jsx'
import { SearchBar } from './SearchBar.jsx';
import { EditWindowTemplate } from './EditWindow.jsx'
import InfoButton from './InfoButton';

const CourseGraph = ({ axiosInstance, courses, onCoursesUpdated, setIsSidebarOpen, setSelectedCourseName }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [editBarState, setEditBarState] = useState(false);
    const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);
    const [editWindowState, setEditWindowState] = useState(false);
    const [labels, setLabels] = useState(['',''])
    const [desc, setDesc] = useState(['',''])
    const [Cfunction, setCfunction] = useState('')

    const openInfoBox = () => {
        setIsInfoBoxOpen(!isInfoBoxOpen);
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
        console.log("Selected course: ", node.data.label);
    };

    const toggleEdit = async () => {
        setEditBarState(!editBarState);
    };

    const handleEditWindow = async (newLabel, newDesc, newFunction) => {
        if (!editWindowState) {
            setEditWindowState(true);
            setLabels(newLabel)
            setDesc(newDesc)
            setCfunction(newFunction)
        }
        else {
            setEditWindowState(false)
        }
    }

    const EditBar = () => {
        if (editBarState===true) {
            return (
                <div className='edit-buttons'>
                <button onClick={() => onLayout(nodes, edges)}>Auto Layout</button>
                <button onClick={() => handleEditWindow(
                    ['Course name', 'Official ID', 'Kori name'],
                    ['Enter course name:', 'Enter official course ID:', 'Enter Kori name:'],
                    'add course'
                    )}>Add Course</button>
                <button onClick={() => handleEditWindow(
                    ['Course name'],
                    ['Enter Kori name of the course to remove:'],
                    'remove'
                    )}>Remove Course</button>
                <button onClick={() => handleEditWindow(
                    ['Course name','Prerequisite course name'],
                    ['Enter the Kori name of the course:','Enter the Kori name of the prerequisite course:'],
                    'add dependency'
                    )}>Add Dependency</button>
                <button onClick={() => handleEditWindow(
                    ['Course name','Prerequisite course name'],
                    ['Enter the Kori name of the course:','Enter the Kori name of the prerequisite course:'],
                    'remove dependency'
                    )}>Remove Dependency</button>
                <button onClick={() => handleKORIAPITEST(axiosInstance)}>KORIAPI TEST</button>
                </div>
            )
        }
    }

    return (
        <div className='reactflow-wrapper'>
            <EditBar state={editBarState} />
            {editWindowState? <EditWindowTemplate state={editWindowState} labels={labels} 
            desc={desc} cfunc={Cfunction} axios={axiosInstance} courses={onCoursesUpdated}/> : <></>}
            <InfoButton onClick={openInfoBox} />
            <button onClick={() => toggleEdit()} className='edit'>Edit</button>
            <InfoBox isOpen={isInfoBoxOpen} onClose={closeInfoBox} />
            <SearchBar axiosInstance={axiosInstance} onCoursesUpdated={onCoursesUpdated}/>

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