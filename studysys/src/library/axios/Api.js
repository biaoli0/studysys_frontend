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
    Log.print(responseData);
    return responseData.datas;
  },

  getCourseList: async () => {
    const responseData = await Rest.get(BACKEND_API_TARGET.COURSE_LIST);
    Log.print(responseData);
    return responseData.datas;
  },

  getCourseTypeList: async () => {
    const responseData = await Rest.get(BACKEND_API_TARGET.COURSE_TYPE_LIST);
    Log.print(responseData);
    return responseData.datas;
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
    Log.print(responseData);
    if (responseData) return true;
    else return false;
  },

  updateCourse: async (updateCourse) => {
    Log.print(updateCourse);
    const requestBody = {
      id: updateCourse.id,
      name: updateCourse.name,
      homework: "no",
      type_Id: updateCourse.type_id,
    };
    Log.print(requestBody);

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.UPDATE_COURSE
    );
    Log.print(responseData);
    if (responseData) return true;
    else return false;
  },

  addCourseType: async (typeName, typeId) => {
    const requestBody = {
      name: typeName,
      homework: "no",
      type_id: typeId,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.ADD_COURSE
    );
    Log.print(responseData);
    if (responseData) return true;
    else return false;
  },

  logout: async () => {
    localStorage.removeItem("token");
    Router.push(BACKEND_API_TARGET.TEACHER_LOGIN);
  },
};
