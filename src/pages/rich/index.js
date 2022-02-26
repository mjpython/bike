import React, { Component } from "react";
import { Card, Button, Modal } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjs from "draftjs-to-html";

export default class Rich extends Component {
  state = {};
  // 编辑器编辑状态改变
  onEditorStateChange = (editorState) => {
    // console.log("编辑器编辑状态改变", editorState);
    this.setState({
      editorState,
    });
  };
  // 点击清空
  handleClearContent = () => {
    this.setState({
      editorState: "",
    });
  };
  // 点击获取文本
  handleGetText = () => {
    this.setState({
      showRichText: true,
    });
  };
  //   编辑内容改变  他和编辑器会同时触发,但是获取的值不同!
  onEditorChange = (contentState) => {
    // console.log("内容改变", contentState);

    this.setState({
      contentState, //内容状态
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="bbton">
        <Card>
          <Button
            type="primary"
            onClick={this.handleClearContent}
            style={{ marginRight: 10 }}
          >
            清空内容
          </Button>
          <Button type="primary" onClick={this.handleGetText}>
            获取HTML文本
          </Button>
        </Card>
        <Card title="富文本编辑器" className="card-wrap">
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onEditorChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false,
            });
          }}
          footer={null}
        >
          {draftjs(this.state.contentState)}
        </Modal>
      </div>
    );
  }
}
