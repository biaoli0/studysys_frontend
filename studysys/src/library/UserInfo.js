
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
}
