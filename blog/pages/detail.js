import { useState } from "react";
import Head from "next/head";
import Header from "./../component/Header";
import { Row, Col, Breadcrumb, Affix } from "antd";
import {
  CalendarOutlined,
  MenuUnfoldOutlined,
  FireOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import Author from "./../component/Author";
import Advent from "./../component/Advent";
import Footer from "./../component/Footer";
import "../static/style/pages/detail.css";
import "markdown-navbar/dist/navbar.css";
import axios from "axios";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Tocify from "../component/tocify.tsx";
import servicePath from "./../config/api";
import CommentBox from "./../component/Comment";

const Detail = (props) => {
  const [isShowCommentForm, setSsShowCommentForm] = useState(false); // 是否展示评论表单
  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  renderer.heading = function (text, level) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}"class="anchor-fix"<h${level}></a>`;
  };

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
  let html = marked(props.content);
  return (
    <div className="container">
      <Head>
        <title>博客详情</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href={`/list?id=${props.typeId}`}>文章列表</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">{props.title}</div>
              <div className="list-icon center">
                <span>
                  <CalendarOutlined /> {props.updateTime}
                </span>
                <span>
                  <MenuUnfoldOutlined /> {props.category}
                </span>
                <span>
                  <FireOutlined /> {props.view_count}
                </span>
              </div>
              <div
                className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
              <div className="detail-comment">
                <CopyOutlined />
                <span className="comment-span">评论</span>
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} lg={5} xl={4}>
          <Author />
          <Advent />
          <Affix offsetTop={50}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col xs={24} sm={16} lg={18} xl={14}>
          <CommentBox isShowCommentForm={isShowCommentForm} />
        </Col>
        <Col className="comm-right" xs={0} sm={0} lg={5} xl={4}></Col>
      </Row>
      <Footer />
    </div>
  );
};

Detail.getInitialProps = async (context) => {
  let id = context.query.id;
  id;
  return new Promise((resolve, reject) => {
    axios(servicePath.getArticleById + id)
      .then((res) => {
        resolve(res.data.data[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default Detail;
