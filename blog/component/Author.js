import { Avatar, Divider } from "antd";
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
          <Avatar size={28} className="account">
            <GithubOutlined />
          </Avatar>
          <Avatar size={28} className="account">
            <QqOutlined />
          </Avatar>
          <Avatar size={28} className="account">
            <WechatOutlined />
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Author;
