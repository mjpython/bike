import React, { Component } from "react";
import { Card } from "antd";
import echartTheme from "./../echartTheme"; //引入图标库主题
// import * as echarts from 'echarts/core';
// import { BarChart } from 'echarts/charts';
// import 'echarts/lib/component/title';
import ReactEcharts from "echarts-for-react";

export default class Pie extends Component {
  getOption1 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        left: "center", //标题位置
      },
      tooltip: {
        trigger: "item", //方块// 鼠标划入显示X,Y轴的信息
      },
      // 小图标
      legend: {
        orient: "vertical",

        right: 10,
        top: 20,
        data: ["周1", "周2", "周3", "周4", "周5", "周6", "周7"],
      },

      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%", //大小
          data: [
            {
              value: 1000,
              name: "Mon",
            },
            {
              value: 1200,
              name: "Tue",
            },
            {
              value: 1400,
              name: "Wed",
            },
            {
              value: 1500,
              name: "Thu",
            },
            {
              value: 2000,
              name: "Fri",
            },
            {
              value: 2600,
              name: "Sat",
            },
            {
              value: 2500,
              name: "Sun",
            },
          ],
          // 元素选中时的效果
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    return option;
  };

  getOption2 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: "center", //标题x轴上居中
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)", //弹出格式 // ! tooltip. formatter //    提示框浮层内容格式器，支持字符串模板和回调函数两种形式。 //    1. 字符串模板 //     折线（区域）图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无） //     散点图（气泡）图 : {a}（系列名称），{b}（数据名称），{c}（数值数组）, {d}（无） //     地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无） //     饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      },
      // 小图标居右垂直
      legend: {
        right: "right",
        orient: "vertical",
      },
      series: [
        {
          name: "订单量",
          type: "pie",
          radius: ["40%", "70%"],
          data: [
            {
              value: 1000,
              name: "Mon",
            },
            {
              value: 1200,
              name: "Tue",
            },
            {
              value: 1400,
              name: "Wed",
            },
            {
              value: 1500,
              name: "Thu",
            },
            {
              value: 2000,
              name: "Fri",
            },
            {
              value: 2600,
              name: "Sat",
            },
            {
              value: 2500,
              name: "Sun",
            },
          ],
        },
      ],
    };
    return option;
  };
  getOption3 = () => {
    let option = {
      legend: {
        right: "right",
        top: "30px",
        orient: "vertical",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [50, 250],
          center: ["50%", "50%"],
          roseType: "area", //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
          itemStyle: {
            borderRadius: 8, //边框圆角
          },
          data: [
            {
              value: 1000,
              name: "Mon",
            },
            {
              value: 1200,
              name: "Tue",
            },
            {
              value: 1400,
              name: "Wed",
            },
            {
              value: 1500,
              name: "Thu",
            },
            {
              value: 2000,
              name: "Fri",
            },
            {
              value: 2600,
              name: "Sat",
            },
            {
              value: 2500,
              name: "Sun",
            },
          ].sort((a, b) => a.value - b.value),
        },
      ],
    };
    return option;
  };
  render() {
    return (
      <div className="bbton">
        <Card title="饼状图表之一">
          <ReactEcharts
            option={this.getOption1()}
            theme={echartTheme}
            style={{ height: 500 }}
          />
        </Card>
        <Card title="饼状图表之二环">
          <ReactEcharts
            option={this.getOption2()}
            theme={echartTheme}
            style={{ height: 500 }}
          />
        </Card>
        <Card title="饼图——南丁格尔图">
          <ReactEcharts
            option={this.getOption3()}
            theme="Imooc"
            style={{ height: 500 }}
          />
        </Card>
      </div>
    );
  }
}
