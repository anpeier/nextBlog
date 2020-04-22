import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "./../component/Header";
import Author from "./../component/Author";
import Advent from "./../component/Advent";
import Footer from "./../component/Footer";
import axios from "axios";
import { Row, Col, List } from "antd";
import {
  CalendarOutlined,
  MenuUnfoldOutlined,
  FireOutlined,
} from "@ant-design/icons";
import "../static/style/pages/index.css";
import servicePath from "./../config/api";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

const Home = (list) => {
  const [myList, setMyList] = useState(list.data);

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
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={16} lg={18} xl={14}>
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
                    <CalendarOutlined /> {item.createTime}
                  </span>
                  <span>
                    <MenuUnfoldOutlined /> {item.category}
                  </span>
                  <span>
                    <FireOutlined style={{ color: "red" }} /> {item.view_count}
                  </span>
                </div>
                <div
                  className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
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

Home.getInitialProps = async () => {
  return new Promise((resolve, reject) => {
    axios(servicePath.getArticleList)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default Home;
