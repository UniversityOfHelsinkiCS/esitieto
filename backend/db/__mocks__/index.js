const addCourse = () => {
  return {
    id: 1,
    kori_id: "CS101",
    course_name: "Intro to CS",
    hy_course_id: "IntroCS101",
  };
};

const getCourses = () => {
  return [{
    id: 1,
    kori_id: "CS101",
    course_name: "Intro to CS",
    hy_course_id: "IntroCS101"
  }];
};

const deleteCourse = (kori_name) => {
  if (kori_name === "IntroCS101") {
    return 1
  } else {
    return 0
  }
};

const addPrerequisiteCourse = (course_hy_id, prerequisite_course_hy_id) => {
  console.log(course_hy_id, prerequisite_course_hy_id)
  if (course_hy_id !== prerequisite_course_hy_id) {
    return [course_hy_id, prerequisite_course_hy_id]
  } else {
    console.log('@', course_hy_id, prerequisite_course_hy_id)
    return []
  }
};


module.exports = {
  addCourse, getCourses, deleteCourse, addPrerequisiteCourse
};
