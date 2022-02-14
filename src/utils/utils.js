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
};
