import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "axios";
import servicePath from "./../config/api";
import "../static/css/article.css";
const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getArticleList,
      withCredentials: true,
    }).then((res) => {
      setList(res.data.data);
    });
  };

  const delArticle = (id) => {
    console.log(id);
    confirm({
      title: "删除文章",
      content: "文章一旦删除，无法恢复，请确认是否删除",
      onCancel() {
        message.info("删除取消");
      },
      onOk() {
        axios({
          method: "delete",
          url: servicePath.delArticle + id,
          withCredentials: true,
        }).then((res) => {
          message.info("删除成功");
          getList();
        });
      },
    });
  };

  const updateArticle = (id) => {
    props.history.push("/add/" + id);
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={6}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>栏目</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={5}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={6}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.category}</Col>
              <Col span={5}>{item.updateTime}</Col>
              <Col span={3}>{item.view_count}</Col>
              <Col span={4}>
                <Button type="primary" onClick={() => updateArticle(item.id)}>修改</Button>
                <Button onClick={() => delArticle(item.id)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      ></List>
    </div>
  );
}

export default ArticleList;
