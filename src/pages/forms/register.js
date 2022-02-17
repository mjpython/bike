import React, { PureComponent } from "react";
import moment from "moment";
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  message,
  InputNumber,
  Switch,
  Select,
  Radio,
  DatePicker,
  TimePicker,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
export default class Register extends PureComponent {
  onSubmitbt = () => {
    let userInfo = this.myForm.getFieldsValue();
    console.log(JSON.stringify(userInfo));
    this.myForm
      .validateFields()
      .then((values) => {
        message.success(
          `${userInfo.username}恭喜你，您通过本次表单学习，您的密码为${userInfo.password}`
        );
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };
  state = {
    loading: false,
  };
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          userImg: imageUrl,
          loading: false,
        })
      );
    }
  };
  render() {
    const FormItem = Form.Item;
    const layout = {
      labelCol: {
        xs: 24,
        sm: 4,
      },
      wrapperCol: {
        xs: 24,
        sm: 12,
      },
    };
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: { span: 12, offset: 4 },
      },
    };
    const rowObject = {
      minRows: 4,
      maxRows: 6,
    };
    const { TextArea } = Input;
    const { loading, userImg } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <div className="bbton">
        <Card title="注册水平表单">
          <Form ref={(c) => (this.myForm = c)}>
            <FormItem
              label="用户名："
              name="userName"
              {...layout}
              rules={[
                {
                  required: true,
                  message: "用户名不能为空!",
                },
                { min: 5, max: 10, message: "长度不符合规则" },
                // {
                //     pattern:/^\w+$/g,
                //     message:"用户名必须是字母或数字且字母开头"
                // }
                {
                  pattern: new RegExp("\\w+$", "g"),
                  message: "用户名必须是字母或数字",
                },
              ]}
            >
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem
              name="password"
              label="密码"
              {...layout}
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </FormItem>
            <FormItem name="sex" label="性别" {...layout} initialValue="1">
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem name="age" label="年龄" {...layout} initialValue={18}>
              <InputNumber />
            </FormItem>
            <FormItem name="state" label="状态" {...layout} initialValue="2">
              <Select>
                <Select.Option value="1">认真学习</Select.Option>
                <Select.Option value="2">无聊发呆</Select.Option>
                <Select.Option value="3">激情冲浪</Select.Option>
                <Select.Option value="4">懒散聊天</Select.Option>
              </Select>
            </FormItem>
            <FormItem
              name="interest"
              label="爱好"
              {...layout}
              initialValue={["2", "5"]}
            >
              <Select mode="multiple">
                <Select.Option value="1">学习</Select.Option>
                <Select.Option value="2">发呆</Select.Option>
                <Select.Option value="3">冲浪</Select.Option>
                <Select.Option value="4">聊天</Select.Option>
                <Select.Option value="5">运动</Select.Option>
              </Select>
            </FormItem>
            <FormItem
              name="isMarried"
              label="是否已婚"
              {...layout}
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </FormItem>
            <FormItem
              name="birthday"
              label="生日"
              {...layout}
              initialValue={moment("2008-08-08")}
            >
              <DatePicker />
            </FormItem>
            <FormItem
              name="address"
              label="联系地址"
              {...layout}
              initialValue="秦皇岛市海港区"
            >
              <TextArea autoSize={rowObject} />
            </FormItem>
            <FormItem
              name="timmer"
              label="起床时间"
              {...layout}
              initialValue={moment("12:08:23", "HH:mm:ss")}
            >
              <TimePicker />
            </FormItem>
            <FormItem label="头像" name="userImg" {...layout}>
              <Upload
                listType="picture-card"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={this.handleChange}
              >
                {userImg ? (
                  <img src={userImg} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </FormItem>
            <FormItem {...offsetLayout}>
              <Form.Item
                name="check"
                valuePropName="checked"
                initialValue={false}
                noStyle
              >
                <Checkbox>我已经仔细阅读并同意</Checkbox>
              </Form.Item>
              <a href=" ">协议相关内容</a>
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.onSubmitbt}>
                注册
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
