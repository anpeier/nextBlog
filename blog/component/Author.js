import { useEffect } from "react";
import { Avatar, Divider, Popover } from "antd";
import { GithubOutlined, QqOutlined, WechatOutlined } from "@ant-design/icons";
import "./../static/style/component/author.css";

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src={"./../static/images/sj.jpg"}></Avatar>
        <div className="author-introduction">
          大三学生
          <Divider>社交账号</Divider>
          <a href="https://github.com/anpeier">
            <Avatar size={28} className="account git">
              <GithubOutlined />
            </Avatar>
          </a>
          <Popover content={<img className="iconBox" src={"./../static/images/qq.webp"}/>}>
            <Avatar size={28} className="account">
              <QqOutlined />
            </Avatar>
          </Popover>
          <Popover content={<img className="iconBox" src={"./../static/images/wx.webp"}/>}>
          <Avatar size={28} className="account wx">
            <WechatOutlined />
          </Avatar>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Author;
