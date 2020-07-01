import { Rest } from "./Rest";
import { BACKEND_API_TARGET } from "./UrlTarget";
import { Log } from "../Log";
import Router from "next/router";

/**
 * Store new token in Local Storage
 * @param {token} The token needed to save
 */
async function saveToken(token) {
  if (token !== undefined) {
    Log.print("save token to LocalStorage, token: " + token);
    await localStorage.setItem("token", token);
  }
}

export const api = {
  /**
   * Verify user authentication with backend server
   * @param {email} User email
   * @param {password} User password
   * @return {data} Data contains: {message, token, isAuthenticated }
   *            {message} The result of authentication.
   *            {token} If user succeed, this is the token from backend server.
   *            {isAuthenticated} Whether user succeed.
   */
  verifyUser: async (email, password) => {
    const requestBody = {
      email: email,
      password: password,
    };

    // Send a POST request with userId and password
    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.TEACHER_LOGIN
    );
    if (!responseData) {
      return {
        message: "Server is down, please try again later",
        isAuthenticated: false,
      };
    } else {
      // Message
      const message = responseData.message;
      // Token
      const token = !responseData.datas ? undefined : responseData.datas.token;
      await saveToken(token);
      // Whether user is successful
      const isAuthenticated = responseData.code === 0;

      return { message, isAuthenticated };
    }
  },

  getStudentList: async () => {
    const responseData = await Rest.get(BACKEND_API_TARGET.STUDENT_LIST);
    return responseData.datas;
  },

  getStudentById: async (id) => {
    const responseData = await Rest.get(BACKEND_API_TARGET.STUDENT_BY_ID + id);
    return responseData.datas;
  },

  getCourseList: async () => {
    const responseData = await Rest.get(BACKEND_API_TARGET.COURSE_LIST);
    return responseData.datas;
  },

  getStudentCourseList: async () => {
    const responseData = await Rest.get(BACKEND_API_TARGET.STUDENT_COURSE_LIST);
    return responseData.datas;
  },

  getCourseTypeList: async () => {
    const responseData = await Rest.get(BACKEND_API_TARGET.COURSE_TYPE_LIST);
    return responseData.datas;
  },

  deleteCourse: async (id) => {
    const requestBody = {
      id: id,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.DELETE_COURSE
    );
    if (responseData) return responseData;
    else return false;
  },

  deleteCourseType: async (id) => {
    const requestBody = {
      id: id,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.DELETE_COURSE_TYPE
    );
    if (responseData) return responseData;
    else return false;
  },

  deleteStudent: async (id) => {
    const requestBody = {
      id: id,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.DELETE_STUDENT
    );
    if (responseData) return responseData;
    else return false;
  },

  addCourse: async (courseName, typeId) => {
    const requestBody = {
      name: courseName,
      homework: "no",
      typeId: typeId,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.ADD_COURSE
    );
    if (responseData) return true;
    else return false;
  },

  addStudent: async (name, typeId, courseId, address) => {
    const requestBody = {
      name: name,
      type_id: typeId,
      course_id: courseId,
      address: address,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.ADD_STUDENT
    );
    if (responseData) return true;
    else return false;
  },

  courseSelection: async (studentId, courseId, courseDate) => {
    const requestBody = {
      student_id: studentId,
      course_id: courseId,
      course_date: courseDate,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.STUDENT_COURSE_SELECTION
    );
    if (responseData) {
      return responseData;
    } else return false;
  },

  updateCourse: async (updateCourse) => {
    const requestBody = {
      id: updateCourse.id,
      name: updateCourse.name,
      homework: "no",
      type_Id: updateCourse.type_id,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.UPDATE_COURSE
    );
    if (responseData) return true;
    else return false;
  },

  updateStudent: async (id, name, typeId, address) => {
    const requestBody = {
      id: id,
      name: name,
      type_id: typeId,
      address: address,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.UPDATE_STUDENT
    );
    if (responseData) return responseData;
    else return false;
  },

  addCourseType: async (typeName) => {
    const requestBody = {
      name: typeName,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.ADD_COURSE_TYPE
    );
    if (responseData) return responseData;
    else return false;
  },

  getStudentTypeList: async () => {
    const responseData = await Rest.get(BACKEND_API_TARGET.STUDENT_TYPE_LIST);
    return responseData.datas;
  },

  getSelectionByDate: async (date) => {
    const responseData = await Rest.get(
      BACKEND_API_TARGET.SELECTION_BY_DATE + date
    );
    return responseData.datas;
  },

  logout: async () => {
    localStorage.removeItem("token");
    Router.push(BACKEND_API_TARGET.TEACHER_LOGIN);
  },
};
