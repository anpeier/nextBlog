import { Comment, Tooltip, Input, Button, Form } from "antd";
import moment from "moment";
import "./../static/style/component/comment.css";
const { TextArea } = Input;
moment.locale("zh-cn");

const CommentBox = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const cancle = () => {
    form.resetFields();
  };

  return (
    <div className="Comment">
      {props.isShowCommentForm && (
        <Form
          size="large"
          className="comment-form"
          form={form}
          name="control-hooks"
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
            rules={[{ required: true }]}
          >
            <Input placeholder="您的邮箱(私密)" />
          </Form.Item>
          <Form.Item name="content">
            <TextArea placeholder="请输入评论内容" />
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

      <Comment
        // actions={actions}
        author="test"
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
};

export default CommentBox;
