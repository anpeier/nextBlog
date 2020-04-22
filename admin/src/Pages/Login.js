import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Input, Spin, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../static/css/login.css";
import servicePath from "./../config/api";
import axios from "axios";

function Login(props) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoding] = useState(false);

  const checkLogin = () => {
    if (!userName) {
      message.error("请输入用户名");
      return;
    } else if (!password) {
      message.error("请输入密码");
      return;
    }
    setIsLoding(true);
    let userInfo = {
      userName,
      password,
    };
    console.log(servicePath.login);
    axios({
      method: "post",
      url: servicePath.login,
      data: userInfo,
      withCredentials: true, // 前后端共享session
    }).then((res) => {
      setIsLoding(false);
      console.log(res.data);
      if (res.data.data === "登陆成功") {
        localStorage.setItem("openId", res.data.openId);
        props.history.push("/");
      } else {
        message.error("用户名或密码错误");
      }
    });
  };

  return (
    <div className="login-div">
      <Spin tip="登录中" spinning={isLoading}>
        <Card
          title="anpeier Blog system"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="请输入用户名"
            style={{ color: "rgba(0,0,0,.25)" }}
            prefix={<UserOutlined />}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="请输入密码"
            style={{ color: "rgba(0,0,0,.25)" }}
            prefix={<LockOutlined />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            登录
          </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
