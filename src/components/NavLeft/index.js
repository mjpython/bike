import React, { PureComponent } from "react";
import { Menu } from "antd";
import "./index.less";
import MenuConfig from "../../config/menuConfig";
import { NavLink } from "react-router-dom";
import { switchMenu } from "./../../redux/action";
import { connect } from "react-redux";
const { SubMenu } = Menu;
class NavLeft extends PureComponent {
  state = {
    menuTreeNode: [],
    currentKey: "",
  };
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    let currentKey = window.location.hash.replace(/#|\?.*$/g, "");
    this.setState({
      currentKey,
      menuTreeNode,
    });
  }

  handleClick = ({ item, key }) => {
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title));
    this.setState({
      currentKey: key,
    });
  };
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} title={item.title}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };
  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>ImoocMS</h1>
        </div>
        <Menu
          theme="dark"
          onClick={this.handleClick}
          selectedKeys={this.state.currentKey}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}
export default connect()(NavLeft);
