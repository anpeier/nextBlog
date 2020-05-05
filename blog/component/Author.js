import { Avatar, Divider, Popover, Tag } from "antd";
import { GithubOutlined, QqOutlined, WechatOutlined } from "@ant-design/icons";
import "./../static/style/component/author.css";

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src={"./../static/images/sj.jpg"}></Avatar>
        <div className="author-introduction">
          <div className="author-name">安培儿</div>
          <div className="tags">
            <Tag className="tag" color="magenta">大三学生</Tag>
            <Tag className="tag" color="red">菜鸟</Tag>
            <Tag className="tag" color="volcano">学习ing...</Tag>
            <Tag className="tag" color="orange">前端大白</Tag>
            <Tag className="tag" color="gold">头发茂盛</Tag>
          </div>
          <span className="description">一个想做全栈工程师的准程序员</span>
          <Divider>社交账号</Divider>
          <Popover
            content={
              <span className="author-span">https://github.com/anpeier</span>
            }
          >
            <a href="https://github.com/anpeier">
              <Avatar size={28} className="account git">
                <GithubOutlined />
              </Avatar>
            </a>
          </Popover>
          <Popover
            content={
              <img className="iconBox" src={"./../static/images/qq.webp"} />
            }
          >
            <Avatar size={28} className="account">
              <QqOutlined />
            </Avatar>
          </Popover>
          <Popover
            content={
              <img className="iconBox" src={"./../static/images/wx.webp"} />
            }
          >
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
