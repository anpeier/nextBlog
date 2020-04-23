import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./../static/css/index.css";
import AddArticle from "./AddArticle";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex() {
  const [collapsed, setCollapsed] = useState(false);
  let onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <img src={require("./../static/images/img8.webp")} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
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
            <Menu.Item key="3">文章列表</Menu.Item>
            <Menu.Item key="4">添加文章</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
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
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>lapsj.com</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
