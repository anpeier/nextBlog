module.exports = (option) => {
  return async function adminAuth(ctx, next) {
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = {
        data: "未登录",
      };
    }
  };
};
