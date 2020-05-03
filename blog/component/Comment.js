import { useState, useEffect } from "react";
import { Comment, Tooltip, Input, Button, Form, message } from "antd";
import moment from "moment";
import "./../static/style/component/comment.css";
import axios from "axios";
import servicePath from "./../config/api";
const { TextArea } = Input;
moment.locale("zh-cn");

const CommentBox = (props) => {
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let obj = {};
    obj.nickname = values.nickname;
    obj.email = values.email;
    obj.content = content;
    obj.article_id = props.article_id;
    axios({
      url: servicePath.addComment,
      method: "POST",
      data: obj,
    }).then((data) => {
      if (data.data.insertSuccess) {
        message.success("评论成功");
        form.resetFields();
        setContent("");
        props.onClick();
        getComment();
      } else {
        message.error("评论失败");
      }
    });
  };

  useEffect(() => {
    getComment();
  }, []);

  const getComment = () => {
    axios({
      url: servicePath.getComment + props.article_id,
      method: "GET",
    }).then((data) => {
      setCommentList(data.data.data);
    });
  };

  const cancle = () => {
    form.resetFields();
    setContent("");
    props.onClick();
  };

  const validateMessages = {
    required: "'${name}' 是必填字段",
  };

  return (
    <div className="Comment">
      {props.isShowCommentForm && (
        <Form
          size="large"
          className="comment-form"
          form={form}
          name="control-hooks"
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item
            className="comment-input"
            name="nickname"
            rules={[{ required: true }]}
          >
            <Input placeholder="您的昵称" />
          </Form.Item>
          <Form.Item
            className="comment-input"
            name="email"
            validateTrigger="onBlur"
            rules={[
              { required: true },
              {
                pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                message: "请输入正确的邮箱",
              },
            ]}
          >
            <Input placeholder="您的邮箱(私密)" />
          </Form.Item>
          <Form.Item className="comment-area" rules={[{ required: true }]}>
            <TextArea
              autoSize={{ minRows: 3 }}
              maxLength="200"
              placeholder="请输入评论内容"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <span className="area-span">
              当前{content.length}个字，最多评论140个字符
            </span>
          </Form.Item>
          <Form.Item className="comment-btnGroup">
            <Button
              size="large"
              className="btn1"
              type="primary"
              htmlType="submit"
            >
              发表
            </Button>
            <Button
              size="large"
              type="default"
              htmlType="button"
              onClick={cancle}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      )}
      {commentList.length ? (
        commentList.map((item) => (
          <Comment
          className="comment-list"
            key={item.id}
            author={item.nickname}
            content={<p>{item.content}</p>}
            datetime={
              <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                <span>{moment(item.createTime).fromNow()}</span>
              </Tooltip>
            }
          />
        ))
      ) : (
        <div className="noCommentData">
          <span>暂无评论</span>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
