import React, { useState, useEffect } from "react";
import "./../static/style/component/header.css";
import { Row, Col, Menu } from "antd";
import {
  HomeOutlined,
  FileMarkdownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const Header = () => {
  const [isFixed, setFixed] = useState(false);

  let initHeight = () => {
    let clientHeight =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (clientHeight > 0) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", initHeight);
    return () => {
      window.removeEventListener("scroll", initHeight, false);
    };
  });

  return (
    <div className={`header ${isFixed ? "is_fixed" : ""}`}>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">安培儿</span>
          <span className="header-txt">安培儿的个人博客</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal">
            <Menu.Item key="home">
              <Link href={{ pathname: "index" }}>
                <a>
                  <HomeOutlined />
                  首页
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="article">
              <Link href={{ pathname: "list", query: { id: 1 } }}>
                <a>
                  <FileMarkdownOutlined />
                  文章
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="life">
              <Link href={{ pathname: "list", query: { id: 2 } }}>
                <a>
                  <SmileOutlined />
                  生活
                </a>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
