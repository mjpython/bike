import React, { PureComponent } from "react";
import { Button, Card, notification } from "antd";
import "../index.less";
export default class Notices extends PureComponent {
  openNotificationWithIcon = (type, direction) => {
    if (direction) {
      notification.config({
        placement: direction,
      }); //   全局配置，之后的点击都会跟随设置的方向位置出现
    }
    notification[type]({
      message: "您有新的消息",
      description:
        "这是新消息，新消息.这是新消息，新消息。这是新消息，新消息。这是新消息，新消息。这是新消息，新消息这是新消息，新消息.这是新消息，新消息.",
    });
  };
  render() {
    const { openNotificationWithIcon } = this;
    return (
      <div className="bbton">
        <Card title="基础按钮" className="card">
          <Button onClick={() => openNotificationWithIcon("success")}>
            Success
          </Button>
          <Button onClick={() => openNotificationWithIcon("info")}>Info</Button>
          <Button onClick={() => openNotificationWithIcon("warning")}>
            Warning
          </Button>
          <Button onClick={() => openNotificationWithIcon("error")}>
            Error
          </Button>
        </Card>
        <Card title="带位置的" className="card">
          <Button
            onClick={() => openNotificationWithIcon("success", "topLeft")}
          >
            左上
          </Button>
          <Button onClick={() => openNotificationWithIcon("info", "topRight")}>
            右上Info
          </Button>
          <Button
            onClick={() => openNotificationWithIcon("warning", "bottomRight")}
          >
            右下Warning
          </Button>
          <Button
            onClick={() => openNotificationWithIcon("error", "bottomLeft")}
          >
            左下Error
          </Button>
        </Card>
      </div>
    );
  }
}
