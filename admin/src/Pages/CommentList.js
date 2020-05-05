import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "axios";
import servicePath from "./../config/api";
import "../static/css/article.css";
import "../static/css/common.css";
import { formatTime } from "./../util/index";
const { confirm } = Modal;

function CommentList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getCommentList,
      withCredentials: true,
    }).then((res) => {
      setList(res.data.data);
    });
  };

  const delArticle = (id) => {
    console.log(id);
    confirm({
      title: "删除留言",
      content: "请确认是否删除该条留言",
      onCancel() {
        message.info("删除取消");
      },
      onOk() {
        axios({
          method: "delete",
          url: servicePath.delComment + id,
          withCredentials: true,
        }).then(() => {
          message.info("删除成功");
          getList();
        });
      },
    });
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={4}>
              <b>留言人</b>
            </Col>
            <Col span={7}>
              <b>留言内容</b>
            </Col>

            <Col span={6}>
              <b>邮箱</b>
            </Col>
            <Col span={4}>
              <b>留言时间</b>
            </Col>
            <Col span={3}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={4}>{item.nickname}</Col>
              <Col className="tooLong" span={7}>
                {item.content}
              </Col>
              <Col span={6}>{item.email}</Col>
              <Col span={4}>{formatTime(item.createTime)}</Col>
              <Col span={3}>
                <Button onClick={() => delArticle(item.id)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      ></List>
    </div>
  );
}

export default CommentList;
