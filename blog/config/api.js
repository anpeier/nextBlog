let baseUrl = "http://127.0.0.1:7001/blog/";

let servicePath = {
  getArticleList: baseUrl + "getArticleList", // 首页
  getArticleById: baseUrl + "getArticleById/", // 文章详情页
  getListById: baseUrl + "getListById/", // 根据类别获取文章
};

export default servicePath;
