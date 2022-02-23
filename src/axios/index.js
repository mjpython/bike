import axios from "axios";
import jsonP from "jsonp";
import { Modal } from "antd";
import Utils from "../utils/utils";
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
  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById("ajaxLoading");
      loading.style.display = "block";
    }
    let baseApi =
      "https://mock.apipost.cn/app/mock/project/86680e29-7a22-4999-832a-a2ee3b9d9571";
    return new Promise((resolve, reject) => {
      axios({
        url: options.url + ".php",
        method: "get",
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || "",
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById("ajaxLoading");
          loading.style.display = "none";
        }
        if (response.status === 200) {
          let res = response.data;
          if (res.code == "0") {
            resolve(res);
          } else {
            console.log(res);
            Modal.info({
              title: "提示",
              content: res.msg,
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }
  static requestList(_this, url, params) {
    let datas = {
      params,
    };
    this.ajax({
      url,
      datas,
    }).then((res) => {
      if (res.code == "0") {
        _this.setState({
          dataSource: res.result.map((item, index) => {
            item.key = index;
            return item;
          }),
          pagination: Utils.pagination(res, (current) => {
            _this.params.page = current;
            _this.requestList();
          }),
        });
      }
    });
  }
}
