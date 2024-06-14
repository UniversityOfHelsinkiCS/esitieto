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
  console.log('kori_name @deleteCourse', kori_name)
  if (kori_name == "IntroCS101") {
    return 1
  } else {
    return 0
  };
};

module.exports = {
  addCourse, getCourses, deleteCourse
};
