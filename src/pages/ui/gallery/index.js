import React, { PureComponent } from "react";
import { Row, Card, Col, Modal } from "antd";
import "../index.less";
export default class Gallery extends PureComponent {
  state = {
    currentImg: null,
    visible: false,
  };
  openGallery = (imgSrc) => {
    this.setState({
      currentImg: "/gallery/" + imgSrc,
      visible: true,
    });
  };
  render() {
    const imgs = [
      ["1.png", "2.png", "3.png", "4.png", "5.png"],
      ["6.png", "7.png", "8.png", "9.png", "10.png"],
      ["11.png", "12.png", "13.png", "14.png", "15.png"],
      ["16.png", "17.png", "18.png", "19.png", "20.png"],
      ["21.png", "22.png", "23.png", "24.png", "25.png"],
    ];
    const imgList = imgs.map((list) =>
      list.map((item) => {
        return (
          <Card
            style={{ marginBottom: "10px" }}
            cover={<img alt="test" src={"/gallery/" + item} />}
            onClick={() => this.openGallery(item)}
          >
            <Card.Meta title="React study" description="I like Imooc">
                              
            </Card.Meta>
          </Card>
        );
      })
    );
    return (
      <div className="bbton">
        <Row gutter={10}>
          <Col md={5}>{imgList[0]}</Col>
          <Col md={5}>{imgList[1]}</Col>
          <Col md={5}>{imgList[2]}</Col>
          <Col md={5}>{imgList[3]}</Col>
          <Col md={4}>{imgList[4]}</Col>                               
        </Row>
        <Modal
          visible={this.state.visible}
          footer={null}
          title="查看图片"
          onCancel={() => this.setState({ visible: false })}
        >
          <img src={this.state.currentImg} width="100%" />
        </Modal>
      </div>
    );
  }
}
