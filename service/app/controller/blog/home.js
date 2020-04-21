"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "api hi";
  }
  async getArticleList() {
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "DATE_FORMAT(article.createTime,'%Y-%m-%d %H:%i:%s') as createTime," +
      "type.typeName as typeName," +
      "article.view_count as view_count " +
      "FROM article LEFT JOIN type ON article.type_id = type.id";
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async getArticleById() {
    let id = this.ctx.params.id;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as content," +
      "DATE_FORMAT(article.createTime,'%Y-%m-%d %H:%i:%s') as createTime," +
      "type.typeName as typeName," +
      "type.id as typeId," +
      "article.view_count as view_count " +
      "FROM article LEFT JOIN type ON article.type_id = type.id " +
      "WHERE article.id=" +
      id;
    console.log(sql);
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select("type");
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
