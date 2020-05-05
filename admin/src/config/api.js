let baseUrl = "http://127.0.0.1:7001/admin/";

let servicePath = {
  login: baseUrl + "login", // 首页
  getTypeInfo: baseUrl + "getTypeInfo", // 获得文章类别信息
  addArticle: baseUrl + "addArticle", // 添加文章
  updateArticle: baseUrl + "updateArticle", // 修改文章
  getArticleList: baseUrl + "getArticleList", // 修改文章
  addType: baseUrl + "addType", // 添加栏目
  addCategory: baseUrl + "addCategory", // 添加类别
  delArticle: baseUrl + "delArticle/", // 删除文章
  getArticleById: baseUrl + "getArticleById/", // 通过id获取文章
  upload: baseUrl + "upload", // 上传图片
  getCommentList: baseUrl + "getCommentList", // 获取留言列表
  delComment: baseUrl + "delComment/", // 删除评论
  getFriendList: baseUrl + "getFriendList", // 获取友链列表
  delFriend: baseUrl + "delFriend/", // 删除友链
  putFriend: baseUrl + "putFriend", // 修改友链状态
};

export default servicePath;
