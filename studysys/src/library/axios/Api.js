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

async function saveRole(role) {
  if (role !== undefined) {
    Log.print("save role to LocalStorage, token: " + role);
    await localStorage.setItem("info", JSON.stringify(role));
  }
}

function toURLParam(params) {
  if (params)
    return Object.keys(params)
      .map((i) => {
        return i + "=" + params[i];
      })
      .join("&");
}

function toJSON(params) {
  let json = {};
  if (params)
    Object.keys(params).map((i) => {
      json[i] = params[i];
    });
  return json;
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
  verifyUser: async (login_type, email, password) => {
    const requestBody = {
      email: email,
      password: password,
    };

    let apiTarget;
    switch (login_type) {
      case "student":
        apiTarget = BACKEND_API_TARGET.STUDENT_LOGIN;
        break;
      case "teacher":
        apiTarget = BACKEND_API_TARGET.TEACHER_LOGIN;
        break;
      case "manager":
        apiTarget = BACKEND_API_TARGET.MANAGER_LOGIN;
        break;
      default:
        return { message: "false", isAuthenticated: false };
    }
    // Send a POST request with userId and password
    const responseData = await Rest.post(requestBody, apiTarget);
    if (!responseData) {
      return {
        message: "Server is down, please try again later",
        isAuthenticated: false,
      };
    } else {
      let message, isAuthenticated;
      // Message
      message = responseData.message;
      // Token
      const token = !responseData.datas ? undefined : responseData.datas.token;
      await saveToken(token);
      // User Info
      const role = !responseData.datas ? undefined : responseData.datas.info;
      await saveRole(role);
      // Whether user is successfully login
      if (responseData.hasOwnProperty("code") && responseData.code === 0) {
        isAuthenticated = responseData.code === 0;
        const loginType = responseData.datas.login_type;
        Log.print("save loginType to LocalStorage, login-type: " + loginType);
        await localStorage.setItem("login-type", login_type);
      }
      return { message, isAuthenticated };
    }
  },
  // Student
  getStudentList: async (params) => {
    const responseData = await Rest.get(
      `${BACKEND_API_TARGET.STUDENT_LIST}?${toURLParam(params)}`
    );
    return responseData;
  },
  getStudentById: async (id) => {
    const responseData = await Rest.get(BACKEND_API_TARGET.STUDENT_BY_ID + id);
    return responseData.datas;
  },
  getStudentTypeList: async () => {
    const responseData = await Rest.get(BACKEND_API_TARGET.STUDENT_TYPE_LIST);
    return responseData.datas;
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
  getSelection: async (date, course_id) => {
    if (!course_id) course_id = "";
    const responseData = await Rest.get(
      `${BACKEND_API_TARGET.SELECTION_BY_DATE}?course_id=${course_id}&date=${date}`
    );
    return responseData.datas;
  },
  // Teacher
  getTeacherList: async (params) => {
    const responseData = await Rest.get(
      `${BACKEND_API_TARGET.TEACHER_LIST}?${toURLParam(params)}`
    );
    return responseData;
  },
  addTeacher: async (username, email, password) => {
    const requestBody = {
      name: username,
      email: email,
      password: password,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.ADD_TEACHER
    );

    if (responseData) return responseData;
    else return false;
  },
  deleteTeacher: async (id) => {
    const requestBody = {
      id: id,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.DELETE_TEACHER
    );
    if (responseData) return responseData;
    else return false;
  },
  // Course
  getCourseList: async (params) => {
    const responseData = await Rest.get(
      `${BACKEND_API_TARGET.COURSE_LIST}?${toURLParam(params)}`
    );
    console.log(responseData);
    return responseData;
  },
  getStudentCourseList: async (courseId) => {
    const courseParams = courseId ? `course_id=${courseId}` : "";
    const responseData = await Rest.get(
      BACKEND_API_TARGET.STUDENT_COURSE_LIST + courseParams
    );
    return responseData.datas;
  },
  getStudentCourseListWithPage: async (params) => {
    const responseData = await Rest.get(
      `${BACKEND_API_TARGET.STUDENT_COURSE_LIST}?${toURLParam(params)}`
    );

    return responseData;
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
  updateCourse: async (updateCourse) => {
    const requestBody = {
      id: updateCourse.id,
      name: updateCourse.name,
      homework: "no",
      type_id: updateCourse.type_id,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.UPDATE_COURSE
    );
    if (responseData) return true;
    else return false;
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
  // Course Type
  getCourseTypeList: async (params) => {
    const responseData = await Rest.get(
      `${BACKEND_API_TARGET.COURSE_TYPE_LIST}?${toURLParam(params)}`
    );
    return responseData.datas;
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
  // Manager
  getManagerList: async (params) => {
    const responseData = await Rest.get(
      `${BACKEND_API_TARGET.MANAGER_LIST}?${toURLParam(params)}`
    );
    return responseData;
  },
  addManager: async (params) => {
    const requestBody = toJSON(params);

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.MANAGER_ADD
    );

    if (responseData) return responseData;
    else return false;
  },
  deleteManager: async (id) => {
    const requestBody = {
      id: id,
    };

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.MANAGER_DELETE
    );
    if (responseData) return responseData;
    else return false;
  },
  // Role
  getRoleList: async (params) => {
    const responseData = await Rest.get(
      `${BACKEND_API_TARGET.ROLE_LIST}?${toURLParam(params)}`
    );
    return responseData;
  },
  addRole: async (params) => {
    const requestBody = toJSON(params);
    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.ROLE_ADD
    );

    if (responseData) return responseData;
    else return false;
  },
  updateRole: async (params) => {
    const requestBody = toJSON(params);
    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.ROLE_UPDATE
    );
    if (responseData) return true;
    else return false;
  },
  deleteRole: async (params) => {
    const requestBody = toJSON(params);

    const responseData = await Rest.post(
      requestBody,
      BACKEND_API_TARGET.MANAGER_DELETE
    );
    if (responseData) return responseData;
    else return false;
  },
  // Other
  logout: async () => {
    localStorage.removeItem("token");
    Router.push(BACKEND_API_TARGET.TEACHER_LOGIN);
  },
  changePassword: async (params) => {
    const requestBody = toJSON(params);

    const responseData = await Rest.post(
        requestBody,
        BACKEND_API_TARGET.CHANGE_PASSWORD
    );
    if (responseData) return responseData;
    else return false;

  },
};
