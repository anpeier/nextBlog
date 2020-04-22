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
      "category.category_name as category," +
      "article.view_count as view_count " +
      "FROM article LEFT JOIN type ON article.type_id = type.id "+
      "LEFT JOIN category ON article.category_id = category.id";
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  // 通过id获取文章
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
      "category.category_name as category," +
      "article.view_count as view_count " +
      "FROM article LEFT JOIN type ON article.type_id = type.id " +
      "LEFT JOIN category ON article.category_id = category.id " +
      "WHERE article.id=" +
      id;
    console.log(sql);
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  async getTypeInfo() {
    // 获取分类
    const result = await this.app.mysql.select("type");
    this.ctx.body = { data: result };
  }

  // 根据类别ID获取文章列表
  async getListById() {
    let id = this.ctx.params.id;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "DATE_FORMAT(article.createTime,'%Y-%m-%d %H:%i:%s') as createTime," +
      "type.typeName as typeName," +
      "category.category_name as category," +
      "article.view_count as view_count " +
      "FROM article LEFT JOIN type ON article.type_id = type.id " +
      "LEFT JOIN category ON article.category_id = category.id " +
      "WHERE article.type_id=" +
      id;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
}

module.exports = HomeController;
