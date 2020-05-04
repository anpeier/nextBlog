let baseUrl = "http://127.0.0.1:7001/blog/";

let servicePath = {
  getArticleList: baseUrl + "getArticleList", // 首页
  getArticleById: baseUrl + "getArticleById/", // 文章详情页
  getListById: baseUrl + "getListById/", // 根据类别获取文章
  addComment: baseUrl + "addComment", // 新增评论
  getComment: baseUrl + "getComment/", // 获取评论列表
  getFriends: baseUrl + "getFriends", // 获取友链列表
  addFriend: baseUrl + "addFriend", // 新增友链
};

export default servicePath;
