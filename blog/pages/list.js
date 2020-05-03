import React, { useState, useEffect } from "react";
import Head from "next/head";
import { withRouter } from "next/router";
import Header from "./../component/Header";
import Author from "./../component/Author";
import Advent from "./../component/Advent";
import Footer from "./../component/Footer";
import { Row, Col, List, Breadcrumb } from "antd";
import {
  CalendarOutlined,
  MenuUnfoldOutlined,
  FireOutlined,
} from "@ant-design/icons";
import servicePath from "./../config/api";
import axios from "axios";
import Link from "next/link";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

const MyList = (list) => {
  const [myList, setList] = useState(list.data);
  useEffect(() => {
    setList(list.data);
  });

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true, // 跟GitHub一样
    pedantic: false, // 容错
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  return (
    <div className="container">
      <Head>
        <title>MyList</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {list.router.query.id === "1" ? "文章列表" : "生活分享"}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item) => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: "detail", query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>

                <div className="list-icon">
                  <span>
                    <CalendarOutlined /> {item.updateTime}
                  </span>
                  <span>
                    <MenuUnfoldOutlined /> {item.category}
                  </span>
                  <span>
                    <FireOutlined
                      className={item.view_count > 100 ? "hot" : ""}
                    />
                    {item.view_count}
                  </span>
                </div>
                <div
                  className="list-context"
                  dangerouslySetInnerHTML={{ __html: item.introduce }}
                ></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} lg={5} xl={4}>
          <Author />
          <Advent />
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

MyList.getInitialProps = async (ctx) => {
  let id = ctx.query.id;
  return new Promise((resolve, reject) => {
    axios(servicePath.getListById + id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default withRouter(MyList);
