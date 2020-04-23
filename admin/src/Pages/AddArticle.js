import React, { useState, useEffect } from "react";
import marked from "marked";
import "./../static/css/addArticle.css";
import { Row, Col, Input, Select, Button, message } from "antd";
import axios from "axios";
import servicePath from "./../config/api";
const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [typeInfo, setTypeInfo] = useState([]); // 文章栏目
  const [selectedType, setSelectType] = useState("请选择栏目"); //选择的文章栏目
  const [categoryInfo, setCategoryInfo] = useState([]); // 文章分类
  const [seletctedCategory, setCategory] = useState("请选择分类"); //选择的文章分类
  const [allCategory, setAllCategory] = useState([]); // 所有分类
  useEffect(() => {
    getTypeInfo();
  }, []);

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true, // 跟GitHub一样
    pedantic: false, // 容错
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: true,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      if (res.data.data === "未登录") {
        localStorage.removeItem("openId");
        props.history.push("/login");
      } else {
        setTypeInfo(res.data.data.resType);
        setAllCategory(res.data.data.resCategory);
      }
    });
  };

  const changeType = (typeId) => {
    setSelectType(typeId);
    let arr = allCategory.filter((item) => item.type_id == typeId);
    setCategoryInfo(arr);
    setCategory(arr[0].id);
  };

  const changeCategory = async (categoryId) => {
    setCategory(categoryId);
  };

  const saveArticle = () => {
    if (selectedType == "请选择栏目") {
      message.error("请选择文章栏目");
      return;
    } else if (seletctedCategory == "请选择分类") {
      message.error("请选择文章分类");
      return;
    } else if (!articleTitle) {
      message.error("请输入文章标题");
    } else if (!articleContent) {
      message.error("请输入文章内容");
    } else if (!introducemd) {
      message.error("请输入文章简介");
    }
    let data = {};
    data.type_id = selectedType;
    data.title = articleTitle;
    data.article_content = articleContent;
    data.introduce = introducemd;
    data.category_id = seletctedCategory;

    if (articleId == 0) {
      axios({
        method: "post",
        url: servicePath.addArticle,
        data,
        withCredentials:true
      }).then((res) => {
        console.log(res);
        setArticleId(res.data.insertId);
        if (res.data.insertSuccess) {
          message.info("保存成功");
        } else {
          message.error("保存失败");
        }
      });
    }
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={16}>
              <Input
                value={articleTitle}
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
                placeholder="博客标题"
                size="large"
              />
            </Col>
            <Col span={4}>
              <Select
                onChange={changeType}
                className="select-type"
                defaultValue={selectedType}
                size="large"
                value={selectedType}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={4}>
              <Select
                className="select-type"
                defaultValue={seletctedCategory}
                size="large"
                onSelect={changeCategory}
                value={seletctedCategory}
              >
                {categoryInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.category_name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>
              <Button onClick={saveArticle} size="large" type="primary">
                发布文章
              </Button>
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                onChange={changeIntroduce}
                rows={4}
                placeholder="请输入文章简介"
              ></TextArea>
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
