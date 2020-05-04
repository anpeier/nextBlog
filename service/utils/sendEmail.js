const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "qq",
  port: 465,
  secureConnection: true,
  auth: {
    user: "1490343356@qq.com",
    pass: "ljkovncnanndbadf",
  },
});
let mailOptions = {
  from: `anpeier<1490343356@qq.com>`,
  subject: "友链申请",
};
const send = () => {
  mailOptions.to = "1490343356@qq.com";
  mailOptions.text = "站主大人，您有新的友链申请啦。快去处理吧！";
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    return info.messageId;
  });
};

module.exports = send;
