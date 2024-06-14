import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseGraph from './CourseGraph';
import { getLayoutedElements } from '../utils/layout';

// Mock the dependencies
jest.mock('reactflow', () => {
  const React = require('react');
  const ReactFlowMock = ({ children, ...props }) => <div {...props}>{children}</div>;
  return {
    __esModule: true,
    ...jest.requireActual('reactflow'),
    ReactFlow: ReactFlowMock,
    Controls: () => <div>Controls</div>,
    Background: () => <div>Background</div>,
  };
});

jest.mock('../utils/layout', () => {
  return {
    getLayoutedElements: jest.fn(),
  };
});

jest.mock('../styles/CustomEdge.jsx', () => {
  const React = require('react');
  return () => <div>CustomEdge</div>;
});

const mockCourses = [
  {
    id: '1',
    createNode: jest.fn(() => ({
      id: '1',
      position: { x: null, y: null },
      data: { name: 'Course 1', groupID: 'group1' },
    })),
    createEdges: jest.fn(() => [{ id: 'e1-2', source: '1', target: '2' }]),
  },
  {
    id: '2',
    createNode: jest.fn(() => ({
      id: '2',
      position: { x: null, y: null },
      data: { name: 'Course 2', groupID: 'group2' },
    })),
    createEdges: jest.fn(() => []),
  },
];

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

describe('CourseGraph', () => {
  beforeEach(() => {
    getLayoutedElements.mockReturnValue({
      nodes: mockCourses.map((course) => course.createNode()),
      edges: mockCourses.flatMap((course) => course.createEdges()),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CourseGraph correctly', async () => {
    console.log('Rendering CourseGraph...'); // Debuggaus
    render(
      <CourseGraph
        axiosInstance={jest.fn()}
        courses={mockCourses}
        setIsSidebarOpen={jest.fn()}
        setSelectedCourseName={jest.fn()}
        setSelectedCourseGroupID={jest.fn()}
        savePositions={jest.fn()}
      />
    );

    expect(screen.getByText('Controls')).toBeInTheDocument();
    expect(screen.getByText('Background')).toBeInTheDocument();
    expect(screen.getByText('CustomEdge')).toBeInTheDocument();
  });
});
