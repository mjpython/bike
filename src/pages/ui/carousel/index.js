import React, { PureComponent } from "react";
import { Card, Carousel } from "antd";
import "../index.less";
export default class Carousels extends PureComponent {
  render() {
    return (
      <div className="bbton">
        <Card title="文字轮播" className="card">
          <Carousel autoplay>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className="card slick-wrap">
                        
          <Carousel autoplay effect="fade">
              
            <div>
              <img src="/carousel-img/carousel-1.jpg" />
            </div>
            <div>
              <img src="/carousel-img/carousel-2.jpg" />
            </div>
            <div>
              <img src="/carousel-img/carousel-3.jpg" />
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}
