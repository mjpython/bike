import React, { PureComponent } from "react";
import {
  Button,
  Select,
  message,
  Modal,
  Table,
  Form,
  DatePicker,
  Input,
} from "antd";
import Utils from "../../utils/utils";
const FormItem = Form.Item;
const Option = Select.Option;
export default class FilterForm extends PureComponent {
  // 点击查询时
  handleFilterSubmit = () => {
    let fieldsValue = this.myForm.getFieldsValue();
    this.props.filterSubmit(fieldsValue);
  };
  // 点击重置
  reset = () => {
    this.myForm.resetFields();
  };
  //    渲染表单的列表
  initFormList = () => {
    let formItemList = [];
    let formList = this.props.formList;
    if (formList.length > 0 && formList) {
      formList.map((item, i) => {
        let formitme;
        let { label, name, placeholder, initialValue, width, type, list } =
          item;
        switch (type) {
          case "SELECT": {
            formitme = (
              <FormItem label={label} name={name} initialValue={initialValue}>
                <Select style={{ width: width }} placeholder={placeholder}>
                  {Utils.getOptionList(list)}
                </Select>
              </FormItem>
            );
            formItemList.push(formitme);
            break;
          }
          case "时间查询": {
            formitme = (
              <FormItem name="start_time">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </FormItem>
            );
            formItemList.push(formitme);
            formitme = (
              <FormItem name="end_time">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </FormItem>
            );
            formItemList.push(formitme);
            break;
          }
          case "DATE": {
            formitme = (
              <FormItem label={label} name={name}>
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: width }}
                  placeholder={placeholder}
                />
              </FormItem>
            );
            formItemList.push(formitme);
            break;
          }
          case "INPUT": {
            formitme = (
              <FormItem label={label} name={name}>
                <Input style={{ width: width }} placeholder={placeholder} />
              </FormItem>
            );
            formItemList.push(formitme);
            break;
          }
        }
      });
      return formItemList;
    }
  };
  render() {
    return (
      <Form
        layout="inline"
        style={{ margin: "0 20px" }}
        ref={(c) => (this.myForm = c)}
      >
        {this.initFormList()}
        <FormItem>
          <Button
            type="primary"
            style={{ margin: "0 20px" }}
            onClick={this.handleFilterSubmit}
          >
            查询
          </Button>
          <Button style={{ margin: "0 20px" }} onClick={this.reset}>
            重置
          </Button>
        </FormItem>
      </Form>
    );
  }
}
