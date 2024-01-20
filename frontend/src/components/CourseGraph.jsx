import { useEffect, useCallback } from 'react';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    Background
} from 'reactflow';
import '../styles/graph.css';
import 'reactflow/dist/style.css';
import Course from '../models/Course.js';
import { getLayoutedElements } from '../utils/layout';

// Temporary courses to form a sample graph
const courses = [
    new Course('Tietorakenteet ja algoritmit II',                   'Tira2',    ['Tira1'], 'mandatory'),
    new Course('Tietorakenteet ja algoritmit I',                    'Tira1',    ['Ohja','Jym'], 'mandatory'),
    new Course('Introduction to AI',                                'IntroAI',  ['TodNak1', 'Tira2'], 'mandatory'),
    new Course('Todennäköisyyslaskenta I',                          'TodNak1',  []),
    new Course('Todennäköisyyslaskenta II',                         'TodNak2',  ['TodNak1']),
    new Course('Ohjelmistotuotanto Projekti',                       'Ohtupro',  ['Ohtu','aine-ai','aine-tl','aine-ot'], 'mandatory'),
    new Course('Ohjelmistotuotanto',                                'Ohtu',     ['TikaWeb'], 'mandatory'),
    new Course('Tietokannat ja Web-ohjelmointi',                    'TikaWeb',  ['Ohja'], 'mandatory'),
    new Course('Ohjelmoinnin peruskurssi',                          'Ohpe',     [], 'mandatory'),
    new Course('Ohjelmoinnin jatkokurssi',                          'Ohja',     ['Ohpe'], 'mandatory'),
    new Course('Johdatus Yliopistomatematiikkaan',                  'Jym',      [], 'mandatory'),
    new Course('Aineopintojen harjoitustyö: Algoritmit ja tekoäly', 'aine-ai',  ['Tira2'], 'alternative'),
    new Course('Aineopintojen harjoitustyö: Tietoliikenne',         'aine-tl',  ['Coin'], 'alternative'),
    new Course('Aineopintojen harjoitustyö: Ohjelmistotekniikka',   'aine-ot',  ['Ohja','Tikape','TikaWeb'], 'alternative'),
    new Course('Computer and Internet',                             'Coin',     [], 'mandatory'),
];

const initialNodes = courses.map(course => course.createNode({ x: 0, y: 0 }));
const initialEdges = courses.flatMap(course => course.createEdges());


const CourseGraph = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        getLayoutedElements(nodes, edges);
    }, []);
    
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onLayout = useCallback(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
    }, [nodes, edges, setNodes, setEdges]);

    return (
        <div className='reactflow-wrapper'>
            <button onClick={onLayout}>Auto Layout</button>
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
