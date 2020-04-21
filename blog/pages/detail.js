import Head from "next/head";
import Header from "./../component/Header";
import { Row, Col } from "antd";
const Detail = () => {
  return (
    <div className="container">
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={16} lg={18} xl={14}></Col>
        <Col className="comm-right" xs={0} sm={0} lg={5} xl={4}></Col>
      </Row>
    </div>
  );
};

export default Detail;
