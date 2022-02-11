import jsonP from "jsonp";
export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      jsonP(options.url, { param: "callback" }, function (err, response) {
        debugger;
        if (response.status === "200") {
          resolve(response);
        } else {
          reject(response.message);
        }
      });
    });
  }
}
