import React, { PureComponent } from "react";
import { Row, Col } from "antd";
import NavLeft from "./components/NavLeft";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style/common.less";
export default class Admin extends PureComponent {
  render() {
    return (
      <Row className="container">
        <Col span={3} className="nav-left">
          <NavLeft />
        </Col>
        <Col span={21} className="main">
          <Header />
          <Row className="content">main</Row>
          <Footer />
        </Col>
      </Row>
    );
  }
}
