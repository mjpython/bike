import { Select } from "antd";

export default {
  formateDate(time) {
    if (!time) return "";
    let date = new Date(time);
    let second =
      date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    return (
      date.getFullYear() +
      "年" +
      (date.getMonth() + 1) +
      "月" +
      date.getUTCDate() +
      "  " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      second
    );
  },
  pagination(data, callback) {
    //data当前的数据，callback
    let page = {
      onChange: (current) => {
        callback(current);
      },
      current: data.page,
      pageSize: data.page_size,
      total: data.total,
      showTotal: () => {
        return `一共${data.total}条数据`;
      },
      showQuickJumper: true,
    };
    return page;
  },
  // 获取选项
  getOptionList(list) {
    const Option = Select.Option;
    if (list) {
      let OptionList = [];
      list.map((item, i) => {
        OptionList.push(<Option value={item.id}>{item.name}</Option>);
      });
      return OptionList;
    }
  },
  // selectedRowKeys的封装
  updateSelectedItem(selectedRowKeys, selectedItem, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedItem, //选中的那一行
        selectedIds,
      });
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem, //选中的那一行
      });
    }
  },
};
