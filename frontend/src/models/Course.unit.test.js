import { expect, test } from 'vitest'
import Course from './Course.js'
import { mandatoryCourse, optionalCourse, alternativeCourse, completedCourse, mandatoryEdge, optionalEdge } from '../styles/courseStyles';


test('createNode returns correct values', () => {
    let course = new Course('Tietorakenteet ja algoritmit II', 'Tira2', ['Tira1'], 'mandatory');

    const node = course.createNode({ x: 0, y: 0 });

    expect(node.id).toBe('Tira2');
    expect(node.position).toEqual({ x: 0, y: 0 });
    expect(node.data.label).toBe('Tietorakenteet ja algoritmit II');
    expect(node.style).toBe(mandatoryCourse);
})