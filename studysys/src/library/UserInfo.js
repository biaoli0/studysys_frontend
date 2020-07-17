export default class UserInfo {
  static getInfo() {
    return JSON.parse(localStorage.getItem("info"));
  }
  static getEmail() {
    const userinfo = this.getInfo();
    if (!userinfo) {
      return "";
    } else return userinfo.email;
  }

  static getRoleId() {
    const userinfo = this.getInfo();
    if (!userinfo) {
      return "";
    } else return userinfo.role.id;
  }

  static getMenu() {
    const userinfo = this.getInfo();
    if (!userinfo || (userinfo && !userinfo.hasOwnProperty("role"))) {
      return "";
    } else return userinfo.role.menu;
  }

  static getAll() {
    return [
      // home
      "-dashboard",
      "-student-list",
      "-student-edit",
      "-student-selection",
      // course
      "-course-list",
      "-course-edit",
      "-course-type-list",
      // teacher
      "-teacher-list",
      // manager
      "-manager-list",
      // role
      "-role-list",
      // settings
      "-password",
    ];
  }
}
