import React, { PureComponent } from "react";
import {
  Button,
  Card,
  Select,
  message,
  Modal,
  Table,
  Form,
  DatePicker,
} from "antd";
import axios from "../../axios";
import Utils from "../../utils/utils";
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends PureComponent {
  state = {
    selectedRowKeys: [],
    selectedRowIds: [],
    isOrderVisible: false,
    orderInfo: [],
  };
  //   调用请求数据
  componentDidMount() {
    this.requestList();
  }
  //   请求数据
  requestList = () => {
    axios
      .ajax({
        url: "/order",
        data: {
          params: {
            page: this.params.page,
          },
        },
      })
      .then((res) => {
        if (res.code == "0") {
          this.setState({
            dataSource: res.result.map((item, index) => {
              item.key = index;
              return item;
            }),
            pagination: Utils.pagination(res, (current) => {
              this.params.page = current;
              this.requestList();
            }),
          });
        }
      });
  };
  //   当前页码
  params = {
    page: 1,
  };
  //   结束订单弹出
  handleFinish = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: "信息",
        content: "请选择一条订单进行结束",
      });
      return;
    }
    axios
      .ajax({
        url: "ebike",
        data: {
          params: {
            orderId: item.id,
          },
        },
      })
      .then((res) => {
        if (res.code == "0") {
          console.log(res);
          this.setState({
            isOrderVisible: true,
            orderInfo: res.result,
          });
        }
      });
  };
  //   点击确认结束
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios
      .ajax({
        url: "ebike",
        data: {
          params: {
            orderId: item.id,
          },
        },
      })
      .then((res) => {
        if (res.code == "0") {
          message.success("订单结束成功");
          this.setState({
            isOrderVisible: false,
          });
          this.requestList();
        }
      });
  };
  // 点击选中
  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey, //选中当前行的key值
      selectedItem: record, //选中当前行信息
    });
  };
  render() {
    const {
      dataSource,
      pagination,
      selectedRowKeys,
      selectedIds,
      selectedItem,
      isOrderVisible,
    } = this.state;
    const columns = [
      {
        title: "订单编号",
        dataIndex: "order_sn",
      },
      {
        title: "车辆编号",
        dataIndex: "bike_sn",
      },
      {
        title: "用户名",
        dataIndex: "user_name",
      },
      {
        title: "手机号",
        dataIndex: "mobile",
      },
      {
        title: "里程",
        dataIndex: "distance",
        render(distance) {
          return distance / 1000 + "km";
        },
      },
      {
        title: "行驶时长",
        dataIndex: "total_time",
      },
      {
        title: "状态",
        dataIndex: "status",
        render(status) {
          return status === 1 ? "进行中" : "结束行程";
        },
      },
      {
        title: "开始时间",
        dataIndex: "start_time",
      },
      {
        title: "结束时间",
        dataIndex: "end_time",
      },
      {
        title: "订单金额",
        dataIndex: "total_fee",
      },
      {
        title: "实付金额",
        dataIndex: "user_pay",
      },
    ];
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19,
      },
    };
    const rowSelection = {
      type: "radio",
      selectedRowKeys, //指定选中项的 key 数组，需要和 onChange 进行配合
    };
    return (
      <div className="bbton">
        <Card>
          <FilterForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button
            type="primary"
            style={{ margin: "0 10px" }}
            onClick={this.openOrderDetail}
          >
            订单详情
          </Button>
          <Button type="primary" onClick={this.handleFinish}>
            结束订单
          </Button>
        </Card>
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          selectedRowKeys={selectedRowKeys}
          selectedIds={selectedIds}
          selectedItem={selectedItem}
          rowSelection={rowSelection} //单选多选
          onRow={(record, index) => {
            return {
              onClick: () => {
                this.onRowClick(record, index);
              },
            };
          }}
        />
        <Modal
          title="结束订单"
          visible={isOrderVisible}
          onCancel={() => {
            this.setState({
              isOrderVisible: false,
            });
          }}
          onOk={this.handleFinishOrder}
        >
          <Form {...formItemLayout}>
            <Form.Item label="车辆编号">
              {this.state.orderInfo.bike_sn}
            </Form.Item>
            <Form.Item label="剩余电量">
              {this.state.orderInfo.battery + "%"}
            </Form.Item>
            <Form.Item label="行程开始时间">
              {this.state.orderInfo.start_time}
            </Form.Item>
            <Form.Item label="当前位置">
              {this.state.orderInfo.location}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
class FilterForm extends PureComponent {
  render() {
    return (
      <Form layout="inline" style={{ margin: "0 20px" }}>
        <FormItem label="城市" name="city_id" initialValue="">
          <Select style={{ width: 100 }} placeholder="全部">
            <Option value="">全部</Option>
            <Option value="1">北京</Option>
            <Option value="2">天津</Option>
            <Option value="3">河北</Option>
          </Select>
        </FormItem>
        <FormItem name="start_time">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </FormItem>
        <FormItem name="end_time">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </FormItem>
        <FormItem label="订单状态" name="op_mode" initialValue="">
          <Select style={{ width: 100 }} placeholder="全部">
            <Option value="">全部</Option>
            <Option value="1">进行中</Option>
            <Option value="2">结束状态</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: "0 20px" }}>
            查询
          </Button>
          <Button style={{ margin: "0 20px" }}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
class OpenCityForm extends PureComponent {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 10,
      },
    };
    return (
      <div>
        <Form {...formItemLayout} ref={(c) => (this.myForm = c)}>
          <Form.Item label="选择城市" name="city_id" initialValue="1">
            <Select>
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
            </Select>
          </Form.Item>
          <Form.Item label="营运模式" name="op_mode" initialValue="1">
            <Select>
              <Option value="">全部</Option>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          </Form.Item>
          <Form.Item label="用车模式" name="use_mode" initialValue="1">
            <Select>
              <Option value="">全部</Option>
              <Option value="1">指定停车点</Option>
              <Option value="2">禁停区</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
