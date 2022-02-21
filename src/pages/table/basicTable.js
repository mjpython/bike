import React, { PureComponent } from "react";
import { Card, Table, Modal, Button, message } from "antd";
import axios from "../../axios";
import Utils from "../../utils/utils";
export default class Basictable extends PureComponent {
  state = {
    dataSource: null,
    dataSource1: null,
    selectedRowKeys: [], //选中当前行的key值
    selectedItem: [],
    selectedRows: [],
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
        url: "table",
        data: {
          params: {
            page: this.params.page,
          },
        },
      })
      .then((res) => {
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
  onRowClick = (record, index) => {
    let selectKey = [index];
    Modal.info({
      title: "信息",
      content: `用户名：${record.userName}, key：${record.key}`,
    });
    this.setState({
      selectedRowKeys: selectKey, //选中当前行的key值
      selectedItem: record, //选中当前行信息
    });
  };
  handdleDelete = () => {
    let rows = this.state.selectedRows; //当前这行的信息
    let ids = [];
    rows.map((item) => {
      //遍历当前这行所有内容
      ids.push(item.id); //把id添加到数组中
    });
    Modal.confirm({
      title: "删除提示",
      content: `确定删除${ids.join(",")} 的数据嘛？`, //数组按照，分割成字符串
      onOk: () => {
        message.success("成功");
        this.request();
      },
    });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const columns = [
      {
        title: "id",
        dataIndex: "id",
      },
      {
        title: "用户名",
        dataIndex: "userName",
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
    const rowSelection = {
      type: "radio",
      selectedRowKeys, //指定选中项的 key 数组，需要和 onChange 进行配合
    };
    const rowCheckSelection = {
      type: "checkbox",
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows,
        });
      },
    };
    return (
      <div className="bbton">
        <Card title="基础静态数据表格">
          <Table
            columns={columns} //定义列
            dataSource={this.state.dataSource} //数据源
            pagination={false} //关闭分页
            bordered //加边框
          />
        </Card>
        <Card title="基础动态数据表格" style={{ marginTop: 10 }}>
          <Table
            columns={columns} //定义列
            dataSource={this.state.dataSource1} //数据源
            pagination={false} //关闭分页
            bordered //加边框
          />
        </Card>
        <Card title="单选动态数据表格" style={{ marginTop: 10 }}>
          <Table
            columns={columns} //定义列
            dataSource={this.state.dataSource1} //数据源
            pagination={false} //关闭分页
            bordered //加边框
            rowSelection={rowSelection} //单选多选
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                },
              };
            }}
          />
        </Card>
        <Card title="多选选动态数据表格" style={{ marginTop: 10 }}>
          <Button onClick={this.handdleDelete}>
                                        删除                         
          </Button>
          <Table
            columns={columns} //定义列
            dataSource={this.state.dataSource1} //数据源
            pagination={false} //关闭分页
            bordered //加边框
            rowSelection={rowCheckSelection} //单选多选
          />
        </Card>
        <Card title="分页动态数据表格" style={{ marginTop: 10 }}>
          <Table
            columns={columns} //定义列
            dataSource={this.state.dataSource1} //数据源
            pagination={this.state.pagination} //分页样式
            bordered //加边框
          />
        </Card>
      </div>
    );
  }
}
