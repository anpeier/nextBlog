import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import "./../static/css/index.css";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);
  let onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleClickArticle = (e) => {
    if (e.key == "addArticle") {
      props.history.push("/add");
    } else if (e.key == "ArticleList") {
      props.history.push("/list");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <img src={require("./../static/images/img8.webp")} />
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
            <Menu.Item onClick={handleClickArticle} key="ArticleList">
              文章列表
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>添加文章</Breadcrumb.Item>
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
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>lapsj.com</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
