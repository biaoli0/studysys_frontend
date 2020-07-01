import {Log} from "./Log";
import moment from "moment";

export default class Kit {
  static dateConvert() {
      const data = arguments[0];
     const format = arguments[1] || "DD/MM/YYYY";
    return moment(data).format(format);
  }
}
