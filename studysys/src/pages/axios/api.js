import { REST } from "./REST";

const URL_TARGET = {
  TEACHER_LOGIN: "teacher/login",
};

export const api = {
  post: (requestBody, api_url) => {
    return REST.post(requestBody, api_url);
  },

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
    const response = await api.post(requestBody, URL_TARGET.TEACHER_LOGIN);

    // Handle response data
    const responseData = response === undefined ? undefined : response.data;

    // Message
    const message = !responseData
      ? "Server is down, please try again later"
      : responseData.message;

    // Token
    const token =
      !responseData || !responseData.datas
        ? undefined
        : responseData.datas.token;

    // Whether user is successful
    const isAuthenticated = !responseData ? false : responseData.code === 0;

    return { message, token, isAuthenticated };
  },
};
