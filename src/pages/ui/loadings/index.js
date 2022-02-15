import React, { PureComponent } from "react";
import { Card, Spin, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../index.less";
export default class Buttons extends PureComponent {
  render() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div className="bbton">
        <Card title="Spin用法" className="card">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </Card>
        <Card title="内容遮罩">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="error"
          />
          <Spin>
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="success"
            />
          </Spin>
          <Spin tip="正在加载。。。">
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="success"
            />
          </Spin>
          <Spin indicator={antIcon}>
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
        </Card>
      </div>
    );
  }
}
