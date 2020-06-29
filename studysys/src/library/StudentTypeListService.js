import { api } from "./axios/Api";
import { Log } from "./Log";

export default class StudentTypeListService {
  static typeList;

  static async updateList() {
    if (!StudentTypeListService.typeList) {
      api.getStudentTypeList().then((res) => {
        if (res) {
          StudentTypeListService.typeList = res;
        }
      });
    }
  }

  static findNameById(id) {
    if (StudentTypeListService.typeList) {
      const type = StudentTypeListService.typeList.find(
        (element) => element["id"] === id
      );
      return type["name"];
    }
  }
}
