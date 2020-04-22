module.exports = (app) => {
  const { router, controller } = app;
  var adminAuth = app.middleware.adminAuth();
  router.post("/admin/login", controller.admin.main.checkLogin);
  router.get(
    "/admin/getTypeInfo",
    adminAuth,
    controller.admin.main.getTypeInfo
  );
};
