import React, { PureComponent } from "react";
import Header from "./components/Header";
import "./style/common.less";
export default class Common extends PureComponent {
  render() {
    return (
      <div>
        <div className="simple-page">
          <Header menuType="second" />
        </div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
