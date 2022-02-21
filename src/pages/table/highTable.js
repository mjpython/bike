import React, { PureComponent } from "react";
import { Card, Table, Modal, Button, Badge, message } from "antd";
import axios from "../../axios";
import Utils from "../../utils/utils";
export default class Hightable extends PureComponent {
  state = {
    dataSource: null,
    dataSource1: null,
  };
  componentDidMount() {
    let data = [
      {
        id: "0",
        userName: "Tom",
        sex: 1,
        state: "1",
        interest: "1",
        birthday: "2000-01-01",
        address: "北京市海淀区奥林匹克公园",
        time: "09:00",
      },
      {
        id: "1",
        userName: "BOb",
        sex: 1,
        state: "1",
        interest: "1",
        birthday: "2000-01-01",
        address: "北京市海淀区奥林匹克公园",
        time: "09:00",
      },
      {
        id: "2",
        userName: "lucy",
        sex: 2,
        state: "1",
        interest: "1",
        birthday: "2000-01-01",
        address: "北京市海淀区奥林匹克公园",
        time: "09:00",
      },
    ];
    data.map((item, index) => (item.key = index));
    this.setState({
      dataSource: data,
    });
    this.request();
  }
  params = {
    page: 1,
  };
  request = () => {
    let _this = this;
    axios
      .ajax({
        url: "high",
        data: {
          params: {
            page: this.params.page,
          },
        },
      })
      .then((res) => {
        console.log(res);
        res.result.map((item, index) => (item.key = index));
        if (res.code == "0") {
          this.setState({
            dataSource1: res.result,
            selectedRows: null,
            selectedRowKeys: [],
            pagination: Utils.pagination(res, (current) => {
              console.log(current);
              _this.params.page = current;
              // console.log(_this)
              this.request();
              // console.log(this)
            }), //第二个参数是点击下页时获得的页码
          });
        }
      });
  };

  handdleDelete = (item) => {
    let id = item.id;
    console.log("item", item);
    Modal.confirm({
      title: "确认",
      content: `你确定删除第${id}条数据不`,
      onOk: () => {
        message.success("删除成功");
        this.request();
      },
    });
  };
  handdleChange = (pagination, filters, sorter) => {
    console.log("sorter", sorter);
    this.setState({
      sortOrder: sorter.order,
    });
  };
  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        width: 50,
      },
      {
        title: "用户名",
        dataIndex: "userName",
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        sorter: (a, b) => {
          return a.age - b.age;
        },
        sortOrder: this.state.sortOrder,
      },
      {
        title: "性别",
        dataIndex: "sex",
        render(state) {
          let config = {
            1: "男同学",
            2: "女同学",
          };
          return config[state];
        },
      },
      {
        title: "状态",
        dataIndex: "state",
        render(state) {
          switch (state) {
            case 1:
              return "良好";
            case 2:
              return "优秀";
            default:
              return "不及格";
          }
        },
      },
      {
        title: "爱好",
        dataIndex: "interest",
      },
      {
        title: "生日",
        dataIndex: "birthday",
      },
      {
        title: "地址",
        dataIndex: "address",
      },
      {
        title: "早起时间",
        dataIndex: "time",
      },
    ];
    const columns1 = [
      {
        title: "id",
        dataIndex: "id",
        width: 50,
      },
      {
        title: "用户名",
        dataIndex: "userName",
        width: 100,
        fixed: "left",
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 100,
        render(state) {
          let config = {
            1: "男同学",
            2: "女同学",
          };
          return config[state];
        },
      },
      {
        title: "状态",
        dataIndex: "state",
        render(state) {
          switch (state) {
            case 1:
              return "良好";
            case 2:
              return "优秀";
            default:
              return "不及格";
          }
        },
        width: 100,
      },
      {
        title: "爱好",
        dataIndex: "interest",
        width: 100,
      },
      {
        title: "生日",
        width: 50,
        dataIndex: "birthday",
      },
      {
        title: "生日",
        width: 100,
        dataIndex: "birthday",
      },
      {
        title: "生日",
        width: 100,
        dataIndex: "birthday",
      },
      {
        title: "生日",
        width: 100,
        dataIndex: "birthday",
      },
      {
        title: "生日",
        width: 100,
        dataIndex: "birthday",
      },
      {
        title: "地址",
        width: 100,
        dataIndex: "address",
      },
      {
        title: "早起时间",
        dataIndex: "time",
        width: 100,
      },
    ];
    const columns2 = [
      {
        title: "id",
        dataIndex: "id",
        width: 50,
      },
      {
        title: "用户名",
        dataIndex: "userName",
        width: 100,
        fixed: "left",
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 100,
        render(state) {
          let config = {
            1: "男同学",
            2: "女同学",
          };
          return config[state];
        },
      },
      {
        title: "状态",
        dataIndex: "state",
        render(state) {
          let config = {
            1: <Badge status="success" text="满分" />,
            2: <Badge status="warning" text="优秀" />,
            3: <Badge status="processing" text="及格" />,
            4: <Badge status="error" text="良好" />,
            5: <Badge status="default" text="不及格" />,
          };
          return config[state];
        },
        width: 100,
      },
      {
        title: "爱好",
        dataIndex: "interest",
        width: 100,
      },
      {
        title: "生日",
        width: 100,
        dataIndex: "birthday",
      },
      {
        title: "地址",
        width: 100,
        dataIndex: "address",
      },
      {
        title: "早起时间",
        dataIndex: "time",
        width: 100,
      },
    ];
    const columns3 = [
      {
        title: "id",
        dataIndex: "id",
        width: 50,
      },
      {
        title: "用户名",
        dataIndex: "userName",
        width: 100,
        fixed: "left",
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 100,
        render(state) {
          let config = {
            1: "男同学",
            2: "女同学",
          };
          return config[state];
        },
      },
      {
        title: "状态",
        dataIndex: "state",
        render(state) {
          switch (state) {
            case 1:
              return "良好";
            case 2:
              return "优秀";
            default:
              return "不及格";
          }
        },
        width: 100,
      },
      {
        title: "爱好",
        dataIndex: "interest",
        width: 100,
      },
      {
        title: "生日",
        width: 50,
        dataIndex: "birthday",
      },
      {
        title: "地址",
        width: 100,
        dataIndex: "address",
      },
      {
        title: "早起时间",
        dataIndex: "time",
        width: 100,
      },
      {
        title: "操作",
        render: (text, item) => {
          return (
            <Button
              size="small"
              onClick={() => {
                this.handdleDelete(item);
              }}
            >
              删除
            </Button>
          );
        },
      },
    ];
    return (
      <div className="bbton">
        <Card title="头部固定表格" style={{ marginTop: 10 }}>
          <Table
            columns={columns} //定义列
            dataSource={this.state.dataSource1} //数据源
            pagination={false} //关闭分页
            bordered //加边框
            scroll={{ y: 260 }}
          />
        </Card>
        <Card title="基础静态数据表格">
          <Table
            columns={columns1} //定义列
            dataSource={this.state.dataSource} //数据源
            pagination={false} //关闭分页
            bordered //加边框
            scroll={{ x: 1110 }}
          />
        </Card>
        <Card title="排序表格">
          <Table
            columns={columns} //定义列
            dataSource={this.state.dataSource1} //数据源
            pagination={false} //关闭分页
            bordered //加边框
            onChange={this.handdleChange}
          />
        </Card>
        <Card title="带badge的数据表格">
          <Table
            columns={columns2} //定义列
            dataSource={this.state.dataSource1} //数据源
            pagination={false} //关闭分页
            bordered //加边框
          />
        </Card>
        <Card title="带操作的数据表格">
          <Table
            columns={columns3} //定义列
            dataSource={this.state.dataSource1} //数据源
            pagination={false} //关闭分页
            bordered //加边框
          />
        </Card>
      </div>
    );
  }
}
