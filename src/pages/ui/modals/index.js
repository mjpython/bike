import React, { PureComponent } from "react";
import { Button, Card, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "../index.less";
export default class Modals extends PureComponent {
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false,
  };
  handleCancel = (showModal) => {
    this.setState({
      [showModal]: false,
    });
  };
  handleShow = (showModal) => {
    this.setState({
      [showModal]: true,
    });
  };

  // 信息确认框的弹框
  info() {
    Modal.info({
      title: "This is a notification message",
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  }

  success() {
    Modal.success({
      content: "some messages...some messages...",
    });
  }

  error() {
    Modal.error({
      title: "This is an error message",
      content: "some messages...some messages...",
    });
  }

  warning() {
    Modal.warning({
      title: "This is a warning message",
      content: "some messages...some messages...",
    });
  }
  showConfirm() {
    const { confirm } = Modal;
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  render() {
    return (
      <div className="bbton">
        <Card title="基础模态框" className="card">
          <Button type="primary" onClick={() => this.handleShow("showModal1")}>
            Open
          </Button>
          <Button type="primary" onClick={() => this.handleShow("showModal2")}>
            自定义页脚
          </Button>
          <Button type="primary" onClick={() => this.handleShow("showModal3")}>
            顶部20px弹框
          </Button>
          <Button type="primary" onClick={() => this.handleShow("showModal4")}>
            水平垂直居中
          </Button>
        </Card>
        <Modal
          title="Open的弹框"
          visible={this.state.showModal1}
          onOk={() => this.handleCancel("showModal1")}
          onCancel={() => this.handleCancel("showModal1")}
        >
          <p>欢迎使用图书租借管理系统</p>
        </Modal>
        <Modal
          title="自定义页脚的弹框"
          visible={this.state.showModal2}
          onOk={() => this.handleCancel("showModal2")}
          onCancel={() => this.handleCancel("showModal2")}
          okText="好的"
          cancelText="取消"
        >
          <p>欢迎使用图书租借管理系统</p>
        </Modal>
        <Modal
          title="据顶部20PX的弹框"
          visible={this.state.showModal3}
          onOk={() => this.handleCancel("showModal3")}
          onCancel={() => this.handleCancel("showModal3")}
          okText="好的"
          cancelText="取消"
          style={{ top: 20 }}
        >
          <p>欢迎使用图书租借管理系统</p>
        </Modal>
        <Modal
          title="居中的弹框"
          visible={this.state.showModal4}
          onOk={() => this.handleCancel("showModal4")}
          onCancel={() => this.handleCancel("showModal4")}
          okText="好的"
          cancelText="取消"
          wrapClassName="vertical-center-modal"
        >
          <p>欢迎使用图书租借管理系统</p>
        </Modal>
        <Card title="信息确认框" className="card">
          <Button type="primary" onClick={this.showConfirm}>
            Confirm
          </Button>
          <Button type="primary" onClick={this.info}>
            info
          </Button>
          <Button type="primary" onClick={this.success}>
            Success
          </Button>
          <Button type="primary" onClick={this.error}>
            Error
          </Button>
          <Button type="primary" onClick={this.warning}>
            Warning
          </Button>
        </Card>
      </div>
    );
  }
}
