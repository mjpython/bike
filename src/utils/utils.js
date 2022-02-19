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
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal: () => {
        return `一共${data.result.total}条数据`;
      },
      showQuickJumper: true,
    };
    return page;
  },
};
