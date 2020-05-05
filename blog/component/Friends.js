import { useState, useEffect } from "react";
import "./../static/style/component/friends.css";
import servicePath from "./../config/api";
import axios from "axios";
import { Avatar, Modal, Input, Form, message } from "antd";

const Friends = () => {
  const [friendsList, setList] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [form] = Form.useForm();
  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        axios({
          url: form.getFieldsValue().avatar,
          method: "GET",
        })
          .then(() => {
            let obj = form.getFieldsValue();
            let friends = {};
            friends.name = obj.nickname;
            friends.avatar = obj.avatar;
            friends.address = obj.address;
            friends.introduce = obj.introduce;
            friends.email = obj.email;
            axios({
              url: servicePath.addFriend,
              method: "POST",
              data: friends,
            }).then((data) => {
              if (data.data.insertSuccess) {
                message.success("提交成功，请等候站主同意");
                setShowModal(false);
                form.resetFields();
              } else {
                message.error("提交失败，请重试");
              }
            });
          })
          .catch(() => {
            message.error("请输入正确的头像地址");
            return;
          });
      })
      .catch((err) => {
        message.error(err);
      });
  };
  useEffect(() => {
    getFriends();
  }, []);
  const getFriends = () => {
    axios(servicePath.getFriends).then((data) => {
      setList(data.data.data);
    });
  };
  const validateMessages = {
    required: "'${name}' 是必填字段",
  };
  return (
    <div className="friends">
      {friendsList.map((item) => (
        <div className="fridents-box" key={item.id}>
          <Avatar
            size={64}
            src={
              item.avatar
                ? item.avatar
                : "http://q98zck26y.bkt.clouddn.com/defaultAvatar.jpg"
            }
          ></Avatar>
          <a
            style={{
              color: `rgb(${Math.random() * 255},${Math.random() * 255},${
                Math.random() * 255
              })`,
            }}
            className="friends-name"
            href={item.address}
          >
            {item.name}
          </a>
          <div className="friends-introduce">
            {item.introduce ? item.introduce : "暂无介绍"}
          </div>
        </div>
      ))}
      <div className="add-friends">
        <button className="add-btn" onClick={() => setShowModal(true)}>
          申请友链
        </button>
      </div>
      <Modal
        title="新增友链"
        visible={showModal}
        onOk={handleOk}
        onCancel={() => setShowModal(false)}
      >
        <Form
          size="large"
          className="friends-form"
          form={form}
          name="control-hooks"
          validateMessages={validateMessages}
        >
          <Form.Item
            className="friends-input"
            name="nickname"
            validateTrigger="onBlur"
            rules={[{ required: true }]}
          >
            <Input placeholder="您的网站名称(必填)" />
          </Form.Item>
          <Form.Item className="friends-input" name="avatar">
            <Input placeholder="您的头像地址" />
          </Form.Item>
          <Form.Item
            className="friends-input"
            name="address"
            validateTrigger="onBlur"
            rules={[{ required: true }]}
          >
            <Input placeholder="您的网站地址(必填)" />
          </Form.Item>
          <Form.Item className="friends-input" name="introduce">
            <Input placeholder="您网站的简介" />
          </Form.Item>
          <Form.Item
            className="friends-input"
            name="email"
            validateTrigger="onBlur"
            rules={[
              { required: true },
              {
                pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                message: "请输入正确的邮箱",
              },
            ]}
          >
            <Input placeholder="您的邮箱(必填)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Friends;
