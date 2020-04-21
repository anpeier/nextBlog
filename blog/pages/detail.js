import Head from "next/head";
import Header from "./../component/Header";
import { Row, Col, Breadcrumb, Affix } from "antd";
import {
  CalendarOutlined,
  MenuUnfoldOutlined,
  FireOutlined,
} from "@ant-design/icons";
import Author from "./../component/Author";
import Advent from "./../component/Advent";
import Footer from "./../component/Footer";
import "../static/style/pages/detail.css";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import axios from "axios";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

const Detail = (props) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true, // 跟GitHub一样
    pedantic: false, // 容错
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants:true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });
  let html = marked(props.content);
  return (
    <div className="container">
      <Head>
        <title>detail</title>
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
                  <a href="/list">文章列表</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>xx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">react实战博客</div>
              <div className="list-icon center">
                <span>
                  <CalendarOutlined /> 2020-04-21
                </span>
                <span>
                  <MenuUnfoldOutlined /> react
                </span>
                <span>
                  <FireOutlined /> 100人
                </span>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{__html:html}}
              >
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
              <MarkNav className="article-menu" source={html} ordered={false} />
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

Detail.getInitialProps = async (context) => {
  console.log(context.query.id);
  let id = context.query.id;
  id;
  return new Promise((resolve, reject) => {
    axios("http://127.0.0.1:7001/blog/getArticleById/" + id)
      .then((res) => {
        console.log(res.data.data);
        console.log("res.data");
        resolve(res.data.data[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default Detail;
