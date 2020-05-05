import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "axios";
import servicePath from "./../config/api";
import "../static/css/article.css";
import "../static/css/common.css";
import { formatTime } from "./../util/index";
const { confirm } = Modal;

function FriendList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getFriendList,
      withCredentials: true,
    }).then((res) => {
      setList(res.data.data);
    });
  };

  const delFriend = (id) => {
    console.log(id);
    confirm({
      title: "删除友链",
      content: "请确认是否删除该条友链",
      onCancel() {
        message.info("删除取消");
      },
      onOk() {
        axios({
          method: "delete",
          url: servicePath.delFriend + id,
          withCredentials: true,
        }).then(() => {
          message.success("删除成功");
          getList();
        });
      },
    });
  };

  const setOrCancleFriend = (id, aggree) => {
    let data = {};
    data.id = id;
    data.aggree = aggree === 1 ? 0 : 1;
    axios({
      method: "put",
      url: servicePath.putFriend,
      withCredentials: true,
      data,
    }).then((data) => {
      if (data.data.updateSuccess) {
        message.success("修改成功");
        getList();
      } else {
        message.error("修改失败");
      }
    });
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={3}>
              <b>申请人</b>
            </Col>
            <Col span={4}>
              <b>网址</b>
            </Col>
            <Col span={5}>
              <b>简介</b>
            </Col>
            <Col span={4}>
              <b>邮箱</b>
            </Col>
            <Col span={4}>
              <b>申请时间</b>
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
              <Col className="tooLong" span={3}>
                {item.name}
              </Col>
              <Col span={4}>{item.address}</Col>
              <Col className="tooLong" span={5}>
                {item.introduce}
              </Col>
              <Col span={4}>{item.email}</Col>
              <Col span={4}>{formatTime(item.createTime)}</Col>
              <Col span={4}>
                <Button onClick={() => setOrCancleFriend(item.id, item.aggree)}>
                  {item.aggree === 1 ? "取消" : "同意"}
                </Button>
                <Button onClick={() => delFriend(item.id)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      ></List>
    </div>
  );
}

export default FriendList;
