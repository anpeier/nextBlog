let baseUrl = "http://127.0.0.1:7001/blog/";

let servicePath = {
  getArticleList: baseUrl + "getArticleList", // 首页
  getArticleById: baseUrl + "getArticleById/", // 文章详情页
};

export default servicePath;
