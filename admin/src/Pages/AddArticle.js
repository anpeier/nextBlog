import React, { useState, useEffect } from "react";
import "./../static/css/addArticle.css";
import { Row, Col, Input, Select, Button, message, Modal, Spin } from "antd";
import axios from "axios";
import servicePath from "./../config/api";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
const { Option } = Select;

let allCategory = []; // 所有分类
function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [typeInfo, setTypeInfo] = useState([]); // 文章栏目
  const [selectedType, setSelectType] = useState("选择栏目"); //选择的文章栏目
  const [categoryInfo, setCategoryInfo] = useState([]); // 文章分类
  const [seletctedCategory, setCategory] = useState("选择分类"); //选择的文章分类
  const [showModal, setShowModal] = useState(false); // 添加类别
  const [type, setType] = useState(2); // 1: 添加栏目 2: 添加分类
  const [typeOrCategory, setTypeOrCategory] = useState(""); // 分类或栏目名称
  const [upLoadSpin, setUpLoadSpin] = useState(false); // 上传加载框
  useEffect(() => {
    getTypeInfo();
    let id = props.match.params.id;
    if (id) {
      setArticleId(id);
      getArticleById(id);
    }
  }, []);

  const handleOk = () => {
    if (type === 1) {
      if (!typeOrCategory) {
        message.error("请输入栏目名称");
        return;
      }
      let data = {};
      data.typeName = typeOrCategory;
      axios({
        method: "post",
        url: servicePath.addType,
        data,
        withCredentials: true,
      }).then((res) => {
        if (res.data.insertSuccess) {
          success();
        }
      });
    } else {
      if (selectedType === "请选择栏目") {
        message.error("请选择文章栏目");
        return;
      } else if (!typeOrCategory) {
        message.error("请输入分类名称");
        return;
      }
      let data = {};
      data.type_id = selectedType;
      data.category_name = typeOrCategory;
      axios({
        method: "post",
        url: servicePath.addCategory,
        data,
        withCredentials: true,
      }).then((res) => {
        if (res.data.insertSuccess) {
          success();
          setSelectType("请选择栏目");
          setCategory("请选择分类");
        }
      });
    }
  };

  const success = () => {
    message.success("添加成功");
    setTypeOrCategory("");
    getTypeInfo();
    setShowModal(false);
  };

  const changeContent = (value) => {
    setArticleContent(value);
  };

  const changeIntroduce = (value) => {
    setIntroducemd(value);
  };

  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      withCredentials: true,
    }).then((res) => {
      if (res.data.data === "未登录") {
        localStorage.removeItem("openId");
        props.history.push("/login");
      } else {
        setTypeInfo(res.data.data.resType);
        allCategory = res.data.data.resCategory;
      }
    });
  };

  const changeType = (typeId) => {
    setSelectType(typeId);
    let arr = allCategory.filter((item) => item.type_id === typeId);
    setCategoryInfo(arr);
    if (arr.length) {
      setCategory(arr[0].id);
    } else {
      setCategory("暂无分类");
    }
  };

  const changeCategory = async (categoryId) => {
    setCategory(categoryId);
  };

  const saveArticle = () => {
    if (selectedType === "请选择栏目") {
      message.error("请选择文章栏目");
      return;
    } else if (
      seletctedCategory === "请选择分类" ||
      seletctedCategory === "暂无分类"
    ) {
      message.error("请选择文章分类");
      return;
    } else if (!articleTitle) {
      message.error("请输入文章标题");
      return;
    } else if (!articleContent) {
      message.error("请输入文章内容");
      return;
    } else if (!introducemd) {
      message.error("请输入文章简介");
      return;
    }
    let data = {};
    data.type_id = selectedType;
    data.title = articleTitle;
    data.article_content = articleContent;
    data.introduce = introducemd;
    data.category_id = seletctedCategory;

    if (articleId === 0) {
      axios({
        method: "post",
        url: servicePath.addArticle,
        data,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.insertSuccess) {
          message.info("文章添加成功");
        } else {
          message.error("文章添加失败");
        }
      });
    } else {
      data.id = articleId;
      axios({
        method: "put",
        url: servicePath.updateArticle,
        data,
        withCredentials: true,
      }).then((res) => {
        if (res.data.updateSuccess) {
          message.info("文章修改成功");
        } else {
          message.error("文章修改失败");
        }
      });
    }
  };

  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      let articleInfo = res.data.data[0];
      setArticleTitle(articleInfo.title);
      setArticleContent(articleInfo.content);
      setIntroducemd(articleInfo.introduce);
      setSelectType(articleInfo.typeId);
      changeType(articleInfo.typeId);
      setCategory(articleInfo.categoryId);
    });
  };

  const imageUploadFunction = (data, onSuccess) => {
    setUpLoadSpin(true);
    const formDate = new FormData();
    formDate.append("image", data);
    axios
      .post(servicePath.upload, formDate)
      .then((res) => {
        onSuccess(res.data.data);
        setUpLoadSpin(false);
        message.success("上传成功");
      })
      .catch((err) => {
        message.error("上传失败，请重试");
        setUpLoadSpin(false);
      });
  };

  return (
    <div>
      <Spin tip="上传中" size="large" spinning={upLoadSpin}>
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
                  onChange={changeCategory}
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
              <Col span={24}>
                <SimpleMDE
                  value={articleContent}
                  className="markdown-content"
                  options={{
                    uploadImage: true,
                    imageUploadFunction,
                  }}
                  onChange={changeContent}
                />
                ;
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <Button onClick={saveArticle} size="large" type="primary">
                  发布文章
                </Button>
                <Button
                  size="large"
                  className="addType"
                  onClick={() => {
                    setShowModal(true);
                    setType(1);
                  }}
                >
                  添加栏目
                </Button>
                <Button
                  size="large"
                  className="addType"
                  onClick={() => {
                    setShowModal(true);
                    setType(2);
                  }}
                >
                  添加分类
                </Button>
              </Col>
              <Col span={24}>
                <SimpleMDE
                  value={introducemd}
                  className="markdown-introduce"
                  onChange={changeIntroduce}
                  options={{
                    hideIcons: [
                      "image",
                      "fullscreen",
                      "unordered-list",
                      "side-by-side",
                      "guide",
                    ],
                  }}
                />
                ;
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>

      <Modal
        title={type === 1 ? "添加栏目" : "添加分类"}
        visible={showModal}
        onOk={handleOk}
        onCancel={() => setShowModal(false)}
      >
        {type === 2 && (
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
        )}

        <Input
          size="large"
          placeholder={type === 1 ? "请输入栏目名称" : "请输入分类名称"}
          onChange={(e) => {
            setTypeOrCategory(e.target.value);
          }}
          value={typeOrCategory}
        />
      </Modal>
    </div>
  );
}

export default AddArticle;
