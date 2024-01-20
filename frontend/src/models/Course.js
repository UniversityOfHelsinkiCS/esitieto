import { mandatoryCourse, optionalCourse, alternativeCourse, completedCourse, mandatoryEdge, optionalEdge } from '../styles/courseStyles';

export default class Course {
    constructor(name, identifier, dependencies = [], courseType = 'optional') {
        this.name = name;
        this.identifier = identifier;
        this.dependencies = dependencies;
        this.courseType = courseType;
    }

    createNode(position) {
        const nodeStyles = {
            mandatory: mandatoryCourse,
            optional: optionalCourse,
            completed: completedCourse,
            alternative: alternativeCourse
        };
        const selectedNodeStyle = nodeStyles[this.courseType] || optionalCourse;

        return {
            id: this.identifier,
            position: position,
            data: { label: this.name },
            style: selectedNodeStyle
        };
    }

    createEdges() {
        const edgeStyles = {
            mandatory: mandatoryEdge,
            optional: optionalEdge,
        };
        const selectedEdgeStyle = edgeStyles[this.courseType] || optionalEdge;

        return this.dependencies.map(dep => ({
            id: `e-${this.identifier}-${dep}`,
            source: this.identifier,
            target: dep,
            style: selectedEdgeStyle
        }));
    }
}
