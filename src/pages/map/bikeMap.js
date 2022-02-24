import React, { PureComponent } from "react";
import { Card, Form } from "antd";
import axios from "../../axios";
import FilterForm from "../../components/BaseForm";
import Utils from "../../utils/utils";
export default class BikeMap extends PureComponent {
  state = {
    total_count: 0,
    dataSource: [],
  };
  //   调用请求数据
  componentDidMount() {
    this.requestList();
  }
  //   请求数据
  requestList = () => {
    axios
      .ajax({
        url: "bikeMap",
        data: {
          params: {
            page: this.params,
          },
        },
      })
      .then((res) => {
        this.setState({
          total_count: res.total_count,
        });
        this.renderMap(res);
      });
  };
  //   当前页码
  params = {
    page: 1,
  };
  // 卸载组件清空
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };
  // 点击提交
  handleFilter = (params) => {
    this.params = params;
    this.requestList();
  };
  // 地图渲染
  renderMap = (res) => {
    let list = res.route_list;
    // 新建地图
    this.map = new window.BMapGL.Map("container");
    // 开启鼠标滚轮缩放
    this.map.enableScrollWheelZoom(true);
    //  地图样式
    this.map.setMapStyleV2({
      styleId: "4ebf36af18accf2987491ba023c148be",
    });
    let gps1 = list[0].split(",");
    let gps2 = list[list.length - 1].split(",");
    let startPoint = new window.BMapGL.Point(gps1[0], gps1[1]);
    let endPoint = new window.BMapGL.Point(gps2[0], gps2[1]);
    this.map.centerAndZoom(endPoint, 11); //初始化地图，设置中心点坐标和地图级别
    // 创建开始标注图标
    let startPointIcon = new window.BMapGL.Icon(
      "/assets/start_point.png",
      new window.BMapGL.Size(36, 42),
      {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(18, 42),
      }
    );
    // 创建开始标注
    let startMarker = new window.BMapGL.Marker(startPoint, {
      icon: startPointIcon,
    });
    // 渲染开始标注
    this.map.addOverlay(startMarker);
    // 创建结束标注图标
    let endPointIcon = new window.BMapGL.Icon(
      "/assets/end_point.png",
      new window.BMapGL.Size(36, 42),
      {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(18, 42),
      }
    );
    let endMarker = new window.BMapGL.Marker(endPoint, { icon: endPointIcon });
    this.map.addOverlay(endMarker);

    // 绘制路线图
    let routeList = [];
    list.map((item, key) => {
      let p = item.split(",");
      routeList.push(new window.BMapGL.Point(p[0], p[1]));
    });
    let polyline = new window.BMapGL.Polyline(routeList, {
      strokeColor: "red",
      strokeWeight: 2,
      strokeOpacity: 0.5,
    });
    this.map.addOverlay(polyline);
    // 绘制服务区图
    let serviceList = [];
    res.service_list.map((item, key) => {
      serviceList.push(new window.BMapGL.Point(item.lon, item.lat));
    });
    let serviceline = new window.BMapGL.Polyline(serviceList, {
      strokeColor: "yellow",
      strokeWeight: 2,
      strokeOpacity: 1,
    });
    this.map.addOverlay(serviceline);

    // 自定义自行车标注图标
    let bikePointIcon = new window.BMapGL.Icon(
      "/assets/bike.jpg",
      new window.BMapGL.Size(36, 42),
      {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(18, 42),
      }
    );
    // 渲染自行车标注
    let bikeList = res.bike_list;
    let bikeMarker, bikePoint;
    bikeList.map((item, key) => {
      let p = item.split(",");
      bikePoint = new window.BMapGL.Point(p[0], p[1]);
      bikeMarker = new window.BMapGL.Marker(bikePoint, {
        icon: bikePointIcon,
      });
      // 渲染标注
      this.map.addOverlay(bikeMarker);
    });
  };
  render() {
    const {} = this.state;
    const formList = [
      {
        type: "SELECT",
        label: "城市",
        field: "city",
        initialValue: "0",
        width: 80,
        list: [
          {
            id: "0",
            name: "全部",
          },
          {
            id: "1",
            name: "北京",
          },
          {
            id: "2",
            name: "上海",
          },
          {
            id: "3",
            name: "天津",
          },
        ],
      },
      {
        type: "时间查询",
        width: 130,
      },
      {
        type: "SELECT",
        label: "订单状态",
        field: "state",
        initialValue: "0",
        width: 80,
        list: [
          {
            id: "0",
            name: "全部",
          },
          {
            id: "1",
            name: "进行中",
          },
          {
            id: "2",
            name: "行程结束",
          },
        ],
      },
    ];
    return (
      <div className="bbton">
        <Card>
          <FilterForm formList={formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <div>共{this.state.total_count}辆</div>
          <div id="container" style={{ height: 500 }}></div>
        </Card>
      </div>
    );
  }
}
