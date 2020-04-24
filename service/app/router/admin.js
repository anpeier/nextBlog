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
  router.post("/admin/addType", adminAuth, controller.admin.main.addType);
  router.get(
    "/admin/getArticleById/:id",
    adminAuth,
    controller.admin.main.getArticleById
  );
  router.post("/admin/upload", controller.admin.upload.upload);
  router.post(
    "/admin/addCategory",
    adminAuth,
    controller.admin.main.addCategory
  );
  router.delete(
    "/admin/delArticle/:id",
    adminAuth,
    controller.admin.main.delArticle
  );
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

  router.get(
    "/admin/getMessageList",
    adminAuth,
    controller.admin.main.getMessageList
  );
};
