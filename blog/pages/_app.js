import App from "next/app";
import Layout from "./../component/Layout";
import "antd/dist/antd.css";
import "./../static/style/pages/common.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}