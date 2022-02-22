import React, { PureComponent } from "react";
import { Row, Col } from "antd";
import "./index.less";
import axios from "axios";
import utils from "../../utils/utils";
export default class Header extends PureComponent {
  state = {
    userName: "小试牛刀",
  };
  componentWillMount() {
    setInterval(() => {
      let sysTime = utils.formateDate(new Date().getTime());
      this.setState({
        sysTime,
      });
    }, 1000);
    this.getWeather();
  }
  getWeather() {
    axios
      .get(
        "https://devapi.qweather.com/v7/weather/now?location=101010100&key=f8f23451f3c84a14b7221fd4be341b55"
      )
      .then((res) => {
        if (res.data.code === "200") {
          let weatherPic = res.data.now.icon;
          let data = res.data.now.text + " " + res.data.now.windDir;
          this.setState({
            weatherPic: "/assets/icons/" + weatherPic + ".svg",
            weather: data,
          });
        }
      });
  }
  render() {
    let { menuType } = this.props;
    return (
      <div className="header">
        <Row className="header-top">
          {menuType ? (
            <Col span="6" className="logo">
              <img src="/assets/logo-ant.svg" alt="" />
              <span>ImoocMS 通用管理系统</span>
            </Col>
          ) : (
            ""
          )}
          <Col span={menuType ? "18" : "24"}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        {menuType ? (
          ""
        ) : (
          <Row className="breadcrumb">
            <Col span="4" className="breadcrumb-title">
              首页
            </Col>
            <Col span="20" className="weather">
              <span className="date">{this.state.sysTime}</span>

              <span className="weather-img">
                <img src={this.state.weatherPic} />
              </span>
              <span className="weather-detail">{this.state.weather}</span>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
