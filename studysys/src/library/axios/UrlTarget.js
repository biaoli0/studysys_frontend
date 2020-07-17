export const BACKEND_API_TARGET = {
  // Login
  TEACHER_LOGIN: "teacher/login",
  STUDENT_LOGIN: "student/login",

  // Student
  STUDENT_LIST: "student/list",
  ADD_STUDENT: "student/add",
  DELETE_STUDENT: "student/delete",
  UPDATE_STUDENT: "student/update",
  STUDENT_COURSE_LIST: "student/course/list",
  STUDENT_COURSE_SELECTION: "student/course/add",
  STUDENT_BY_ID: "student/info?id=",

  // Teacher
  TEACHER_LIST: "teacher/list",
  ADD_TEACHER: "teacher/add",
  DELETE_TEACHER: "teacher/delete",
  UPDATE_TEACHER: "teacher/update",

  // Course
  COURSE_LIST: "course/list",
  COURSE_TYPE_LIST: "course/type/list",
  ADD_COURSE: "course/add",
  DELETE_COURSE: "course/delete",
  UPDATE_COURSE: "course/update",

  // Manager
  MANAGER_LOGIN: "manager/login",
  MANAGER_LIST:"manager/list",
  MANAGER_ADD:"manager/add",
  MANAGER_UPDATE:"manager/update",
  MANAGER_DELETE:"manager/delete",

  // Role
  ROLE_LIST:"role/list",
  ROLE_ADD:"role/add",
  ROLE_UPDATE:"role/update",
  ROLE_DELETE:"role/delete",

  // Course Selection
  SELECTION_BY_DATE: "student/course/list",

  // Course Type
  ADD_COURSE_TYPE: "course/type/add",
  DELETE_COURSE_TYPE: "course/type/delete",

  // Student Type
  STUDENT_TYPE_LIST: "student/type/list",

  // Settings
  CHANGE_PASSWORD: "settings/password",

  // Stat
  COURSE_DATE: "/stat/course-date",
  COURSE_PIE: "/stat/course-pie",
};

export const URL_TARGET = {
  TEACHER_LOGIN: "/user/login",
  STUDENT_LIST: "/home/student/list",
  COURSE_LIST: "/home/course/list",
  ADD_COURSE: "/home/course/add",
  STUDENT_SELECTION: "/home/student/selection",
};
