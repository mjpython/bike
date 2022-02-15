import React, { PureComponent } from "react";
import { Button, Card, message } from "antd";
import "../index.less";
export default class Message extends PureComponent {
  openMessages = (type) => {
    message[type]("您有新的消息");
  };
  render() {
    const { openMessages } = this;
    return (
      <div className="bbton">
        <Card title="全局提示框" className="card">
          <Button onClick={() => openMessages("success")}>Success</Button>
          <Button onClick={() => openMessages("loading")}>Loading</Button>
          <Button onClick={() => openMessages("info")}>Info</Button>
          <Button onClick={() => openMessages("warning")}>Warning</Button>
          <Button onClick={() => openMessages("warn")}>Warn</Button>
          <Button onClick={() => openMessages("error")}>Error</Button>
        </Card>
      </div>
    );
  }
}
