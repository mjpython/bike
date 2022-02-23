import React, { PureComponent } from "react";
import { Table } from "antd";
export default class ETable extends PureComponent {
  // 判断是单选还是复选
  onRowClick = (record, index) => {
    let {
      rowSelection,
      selectedRowKeys,
      selectedItem,
      selectedIds,
      updateSelectedItem,
    } = this.props;
    if (rowSelection === "checkbox") {
      if (selectedIds) {
        let i = selectedIds.indexOf(record.id);
        if (i == -1) {
          selectedIds.push(record.id);
          console.log("selectedIds", selectedIds);
          selectedRowKeys.push(index);
          console.log(selectedRowKeys);
          selectedItem.push(record);
          console.log(selectedItem);
        } else {
          selectedIds.splice(i, 1);
          selectedRowKeys.splice(i, 1);
          selectedItem.splice(i, 1);
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectedItem = [record];
      }
      updateSelectedItem(selectedRowKeys, selectedItem, selectedIds);
    } else {
      let selectKey = [index];
      updateSelectedItem(selectKey, record);
    }
  };

  //    渲染表格的列表
  tableInit = () => {
    let row_selection = this.props.rowSelection;
    let { selectedRowKeys } = this.props;

    const rowSelection = {
      type: "radio",
      selectedRowKeys,
    };
    // console.log(row_selection);默认row_selection为undefined
    if (row_selection === false || row_selection === null) {
      row_selection = false;
    } else if (row_selection === "checkbox") {
      rowSelection.type = "checkbox";
    } else {
      // undefined为假
      row_selection = "radio";
    }

    return (
      <Table
        {...this.props}
        bordered
        rowSelection={row_selection ? rowSelection : null}
        onRow={(record, index) => {
          if (!row_selection) {
            return;
          } else {
            return {
              onClick: () => {
                this.onRowClick(record, index);
              },
            };
          }
        }}
      />
    );
  };
  render() {
    return this.tableInit();
  }
}
