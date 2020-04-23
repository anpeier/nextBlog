module.exports = (app) => {
  const { router, controller } = app;
  var adminAuth = app.middleware.adminAuth();
  router.post("/admin/login", controller.admin.main.checkLogin);
  router.get(
    "/admin/getTypeInfo",
    adminAuth,
    controller.admin.main.getTypeInfo
  );
  router.post("/admin/addArticle", adminAuth, controller.admin.main.addArticle);
  router.put(
    "/admin/updateArticle",
    adminAuth,
    controller.admin.main.updateArticle
  );
  router.get(
    "/admin/getArticleList",
    adminAuth,
    controller.admin.main.getArticleList
  );
};
