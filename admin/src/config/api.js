let baseUrl = "http://127.0.0.1:7001/admin/";

let servicePath = {
  login: baseUrl + "login", // 首页
  getTypeInfo: baseUrl + "getTypeInfo", // 获得文章类别信息
  addArticle: baseUrl + "addArticle", // 添加文章
  updateArticle: baseUrl + "updateArticle", // 修改文章
  getArticleList: baseUrl + "getArticleList", // 修改文章
};

export default servicePath;
