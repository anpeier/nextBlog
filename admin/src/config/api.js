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
};

export default servicePath;
