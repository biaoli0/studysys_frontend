import {Log} from "./Log";
import moment from "moment";

export default class Kit {
  static dateConvert() {
      const data = arguments[0];
     const format = arguments[1] || "DD/MM/YYYY";
     Log.print(data);
    return moment(data).format(format);
  }
}
