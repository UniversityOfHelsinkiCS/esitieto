const mockGetStarted = jest.fn(() => {
  return Promise.resolve({
    rows: [
      {
      "degree_name": "Matemaattisten tieteiden kandiohjelma 2023-2026",
      "degree_years": "2023-2026",
      "hy_degree_id": "kh50_001"
      },
      {
      "degree_name": "Tietojenkäsittelytieteen kandidaattitutkinto 2023-2026",
      "degree_years": "2023-2026",
      "hy_degree_id": "kh50_005"
      }
    ],
    rowCount: 2
  });
});

const addCourse = () => {
  return {
    id: 1,
    kori_id: "CS101",
    course_name: "Intro to CS",
    hy_course_id: "IntroCS101",
  };
};

const deleteCourse = (kori_name) => {
  if (kori_name === "IntroCS101") {
    return 1
  } else {
    return 0
  }
};

const mockGetCourses = jest.fn(() => {
  return Promise.resolve({
    rows: [
      {
        "id": "1",
        "kori_id": "CS101",
        "course_name": "Intro to CS",
        "hy_course_id": "IntroCS101"
      }
    ],
    rowcount: 1
  });
});

const mockGetCourseWithReqursivePrerequisites = jest.fn(() => {
  return Promise.resolve({
    //prerequisities for MAT21001 Lineaarialgebra ja matriisilaskenta II
    rows: [
      {
        "id": "10",
        "kori_id": "hy-CU-117375394",
        "course_name": "Lineaarialgebra ja matriisilaskenta I",
        "identifier": "MAT11002",
        "dependencies": [
          "MAT11001"
        ]
      },
      {
        "id": "5",
        "kori_id": "hy-CU-117375151",
        "course_name": "Johdatus yliopistomatematiikkaan",
        "hy_course_id": "MAT11001",
        "dependencies": []
      },
      {
        "id": "16",
        "kori_id": "hy-CU-117375754",
        "course_name": "Lineaarialgebra ja matriisilaskenta II",
        "identifier": "MAT21001",
        "dependencies": [
          "MAT11002"
        ]
      }
    ],
    rowcount: 3
  });
});

const addPrerequisiteCourse = (course_hy_id, prerequisite_course_hy_id) => {
  if (course_hy_id !== prerequisite_course_hy_id) {
    return [course_hy_id, prerequisite_course_hy_id];
  } else {
    return [];
  }
};

const mockGetDegreeId = jest.fn(() => {
  return Promise.resolve({
    rows: [
      {
        "id":"1",
        "degree_name": "Matemaattisten tieteiden kandiohjelma 2023-2026",
        "hy_degree_id": "kh50_001",
        "degree_years": "2023-2026"
      }
    ],
    rowcount: 1
  });
});

const removePrerequisiteCourse = (course_hy_id, prerequisite_course_hy_id) => {
  if (course_hy_id !== prerequisite_course_hy_id) {
    return [course_hy_id, prerequisite_course_hy_id];
  } else {
    return [];
  }
};

const getDegrees = (degreeCode, degreeYears) => {
  const courses = [
    {
        "name": "Johdatus yliopistomatematiikkaan",
        "kori_id": "hy-CU-117375151",
        "identifier": "MAT11001",
        "type": "compulsory",
        "x": null,
        "y": null,
        "dependencies": []
    },
    {
        "name": "Tietorakenteet ja algoritmit I",
        "kori_id": "hy-CU-132986295",
        "identifier": "TKT200011",
        "type": "compulsory",
        "x": null,
        "y": null,
        "dependencies": [
            "TKT10003",
            "MAT11001"
        ]
    }
  ]
  return courses;
};

module.exports = {
  getStarted: mockGetStarted, addCourse, getCourses: mockGetCourses,
  deleteCourse, addPrerequisiteCourse, removePrerequisiteCourse,
  getDegrees, getDegreeId: mockGetDegreeId,
  getCourseWithReqursivePrerequisites: mockGetCourseWithReqursivePrerequisites
};
