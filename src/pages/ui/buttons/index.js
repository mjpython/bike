import React, { PureComponent } from "react";
import { Button, Card, Radio } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import "../index.less";
export default class Buttons extends PureComponent {
  state = {
    loading: true,
    size: "default",
  };
  handleLoading = () => {
    this.setState({
      loading: false,
    });
  };
  handleSize = (e) => {
    this.setState({
      size: e.target.value,
    });
  };
  render() {
    return (
      <div className="bbton">
        <Card title="基础按钮" className="card">
          <Button type="primary">Imooc</Button>
          <Button>Imooc</Button>
          <Button type="dashed">Imooc</Button>
          <Button type="danger">Imooc</Button>
          <Button disabled>Imooc</Button>
        </Card>
        <Card title="图形按钮" className="card">
          <Button icon={<PlusOutlined />}>创建</Button>
          <Button icon={<EditOutlined />}>编辑</Button>
          <Button icon={<DeleteOutlined />} type="danger">
            删除
          </Button>
          <Button shape="circle" icon={<SearchOutlined />}></Button>
          <Button type="primary">
            <SearchOutlined />
            搜索
          </Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            下载
          </Button>
        </Card>
        <Card title="Loading按钮" className="card">
          <Button type="primary" loading={this.state.loading}>
            确定
          </Button>
          <Button
            type="primary"
            shape="circle"
            loading={this.state.loading}
          ></Button>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button shape="circle" loading={this.state.loading}></Button>

          <Button type="primary" onClick={this.handleLoading}>
            关闭
          </Button>
        </Card>
        <Card title="按钮组">
          <Button.Group>
            <Button type="primary">Backward</Button>

            <Button type="primary">Forward</Button>
          </Button.Group>
        </Card>
        <Card title="按钮尺寸">
          <Radio.Group value={this.state.size} onChange={this.handleSize}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio> 
          </Radio.Group>
             
          <Button type="primary" size={this.state.size}>
            Primary
          </Button>
        </Card>
      </div>
    );
  }
}
