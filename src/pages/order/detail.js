import React, { PureComponent } from "react";
import { Card } from "antd";
import axios from "../../axios";
import "./detail.less";
export default class Detail extends PureComponent {
  state = {
    orderInfo: {},
  };
  //   获取id并发送给接口获取数据
  componentDidMount() {
    let orderId = this.props.match.params.orderId;
    if (orderId) {
      this.getDetailInfo(orderId);
    }
  }
  // 发送id获取数据
  getDetailInfo = (orderId) => {
    axios
      .ajax({
        url: "/orderDetail",
        data: {
          params: {
            orderId: orderId,
          },
        },
      })
      .then((res) => {
        if (res.code == 0) {
          this.setState({
            orderInfo: res.result,
          });
          this.renderMap(res.result);
        }
      });
  };
  //   初始化地图
  renderMap = (result) => {
    // 创建Map实例
    this.map = new window.BMapGL.Map("orderDetailMap");
    // 初始化地图,设置中心点坐标和地图级别
    this.map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 11);
    // 开启鼠标滚轮缩放
    this.map.enableScrollWheelZoom(true);
    // 调用地图控件添加方法
    this.addMapControl();
    // 调用绘制用户行驶路线方法
    this.drawBikeRoute(result.position_list);
    // 调用绘制服务区方法
    this.drawServiceArea(result.area);
  };
  // 添加地图控件
  addMapControl = () => {
    let map = this.map;
    map.addControl(
      new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })
    );
    map.addControl(
      new window.BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })
    );
  };
  // 绘制用户行驶路线
  drawBikeRoute = (positionList) => {
    let map = this.map;
    let startPoint = "";
    let endPoint = "";
    if (positionList.length > 0) {
      let first = positionList[0];
      let last = positionList[positionList.length - 1];
      startPoint = new window.BMapGL.Point(first.lon, first.lat);
      let startIcon = new window.BMapGL.Icon(
        "/assets/start_point.png",
        new window.BMapGL.Size(36, 42),
        {
          imageSize: new window.BMapGL.Size(36, 42),
          anchor: new window.BMapGL.Size(36, 42),
        }
      );
      let startMarker = new window.BMapGL.Marker(startPoint, {
        icon: startIcon,
      });
      map.addOverlay(startMarker);
      endPoint = new window.BMapGL.Point(last.lon, last.lat);
      let endIcon = new window.BMapGL.Icon(
        "/assets/end_point.png",
        new window.BMapGL.Size(36, 42),
        {
          imageSize: new window.BMapGL.Size(36, 42),
          anchor: new window.BMapGL.Size(36, 42),
        }
      );
      let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
      map.addOverlay(endMarker);
    }

    // 连接路线图
    let trackPoint = [];
    for (let i = 0; i < positionList.length; i++) {
      let point = positionList[i];
      trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
    }
    let polyline = new window.BMapGL.Polyline(trackPoint, {
      strokeColor: "#1869AD",
      strokeWeight: 3,
      strokeOpacity: 1,
    });
    map.addOverlay(polyline);
    map.centerAndZoom(endPoint, 11);
  };
  // 绘制服务区
  drawServiceArea = (area) => {
    let map = this.map;
    let trackPoint = [];
    for (let i = 0; i < area.length; i++) {
      let point = area[i];
      trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
    }
    let polygon = new window.BMapGL.Polygon(trackPoint, {
      strokeColor: "#CE0000",
      strokeWeight: 3,
      fillColor: "#ff8605",
      fillOpacity: 0.4,
    });
    map.addOverlay(polygon);
  };

  render() {
    const info = this.state.orderInfo;
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">
                  {info.mode == 1 ? "服务区" : "停车点"}
                </div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{info.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">
                  {info.distance / 1000}公里
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}
