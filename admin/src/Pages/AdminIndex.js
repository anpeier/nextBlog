import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import "./../static/css/index.css";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
import CommentList from "./CommentList";
import FriendList from "./FriendList";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState("");
  let url = props.location.pathname;
  useEffect(() => {
    switch (url) {
      case "/add":
        setTitle("添加文章");
        break;
      case "/list":
        setTitle("文章列表");
        break;
      case "/commentList":
        setTitle("留言管理");
        break;
      case "/friendList":
        setTitle("友链管理");
        break;
      default:
        setTitle("首页");
        break;
    }
  }, [url]);

  let onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleClickArticle = (e) => {
    if (e.key === "addArticle") {
      props.history.push("/add");
    } else if (e.key === "ArticleList") {
      props.history.push("/list");
    } else if (e.key === "commentList") {
      props.history.push("/commentList");
    } else if (e.key === "friendList") {
      props.history.push("/friendList");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <img alt="头像" src={require("./../static/images/img8.webp")} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="addArticle" onClick={handleClickArticle}>
            <PieChartOutlined />
            <span>添加文章</span>
          </Menu.Item>
          <SubMenu
            key="2"
            title={
              <span>
                <UserOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="ArticleList" onClick={handleClickArticle}>
              文章列表
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="commentList" onClick={handleClickArticle}>
            <CommentOutlined />
            <span>留言管理</span>
          </Menu.Item>
          <Menu.Item key="friendList" onClick={handleClickArticle}>
            <CommentOutlined />
            <span>友链管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div>
              <Route path="/" exact component={AddArticle} />
              <Route path="/add/" exact component={AddArticle} />
              <Route path="/add/:id" exact component={AddArticle} />
              <Route path="/list/" exact component={ArticleList} />
              <Route path="/commentList/" exact component={CommentList} />
              <Route path="/friendList/" exact component={FriendList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>lapsj.com</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
