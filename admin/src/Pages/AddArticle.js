import React, { useState } from "react";
import marked from "marked";
import "./../static/css/addArticle.css";
import { Row, Col, Input, Select, Button, DatePicker } from "antd";
const { Option } = Select;
const { TextArea } = Input;

function AddArticle() {
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input placeholder="博客标题" size="large" />
            </Col>
            <Col span={4}>
              <Select defaultValue="1" size="large">
                <Option value="1">Vue</Option>
                <Option value="2">React</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div className="show-html"></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>
              <Button size="large" type="primary">
                发布文章
              </Button>
            </Col>
            <Col span={24}>
              <br />
              <TextArea rows={4} placeholder="请输入文章简介"></TextArea>
              <br />
              <br />
              <div className="introduce-html"></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
