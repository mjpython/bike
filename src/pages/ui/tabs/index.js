import React, { PureComponent } from "react";
import { Tabs, Card, message } from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import "../index.less";
export default class Tabbs extends PureComponent {
  callback(key) {
    message.info("这是第" + key);
  }
  componentWillMount() {
    const panes = [
      {
        title: "Tab 1",
        content: "Tab 1",
        key: "1",
      },
      {
        title: "Tab 2",
        content: "Tab 2",
        key: "2",
      },
      {
        title: "Tab 3",
        content: "Tab 3",
        key: "3",
      },
    ];
    this.setState({
      activeKey: panes[0].key,
      panes,
    });
  }
  newTabIndex = 0;
  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: "New Tab", content: "New Tab Pane", key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = (targetKey) => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter((pane) => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };
  render() {
    const { TabPane } = Tabs;
    const { callback } = this;
    return (
      <div className="bbton">
        <Card title="基础标签页" className="card">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Tab 1" key="1">
              Tab 1
            </TabPane>
            <TabPane tab="Tab 2" disabled key="2">
              Tab 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Tab 3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="图标标签页" className="card">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane
              tab={
                <span>
                  <PlusOutlined /> tab1
                </span>
              }
              key="1"
            >
              Tab 1
            </TabPane>
            <TabPane
              tab={
                <span>
                  <SearchOutlined /> tab2
                </span>
              }
              key="2"
            >
              Tab 2
            </TabPane>
            <TabPane
              tab={
                <span>
                  <EditOutlined /> tab3
                </span>
              }
              key="3"
            >
              Tab 3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="可编辑标签页" className="card">
           
          <Tabs
            defaultActiveKey="1" // onChange={this.callback}
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
                                    
            {this.state.panes.map((value) => {
              return (
                <TabPane tab={value.title} key={value.key}>
                  {value.content}                 
                </TabPane>
              );
            })}
                                
          </Tabs>
        </Card>
      </div>
    );
  }
}
