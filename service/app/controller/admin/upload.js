const Controller = require("egg").Controller;

const path = require("path");
const fs = require("mz/fs");
const qiniu = require("qiniu");
const bucket = "lapsj-imgs"; //要上传的空间名
const imageUrl = "http://q98zck26y.bkt.clouddn.com/"; // 空间绑定的域名
const accessKey = "3_ltgskhqXQHbroIA6-BsmoWpx8SgO79kbC6rZy_"; //Access Key
const secretKey = "3cUoV3ZAsTcnfjrw1iFhA1Lhdl1TvTfI640EehYg"; //Secret Key
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: bucket,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
let config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;

class UploaderController extends Controller {
  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = Date.now() + stream.filename;
    const savePath = path.join(this.config.baseDir, `images/${filename}`);
    // 创建文件写入流
    const remoteFileStrem = fs.createWriteStream(savePath);
    console.log(savePath);
    try {
      await stream.pipe(remoteFileStrem);
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const imgSrc = await new Promise((resolve, reject) => {
        formUploader.putFile(
          uploadToken,
          filename,
          savePath,
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject("");
            }
            if (respInfo.statusCode == 200) {
              resolve(imageUrl + respBody.key);
            } else {
              reject("");
            }
            // 上传之后删除本地文件
            fs.unlinkSync(savePath);
          }
        );
      });
      ctx.body = {
        data: imgSrc,
        message: "上传成功",
      };
    } catch (err) {
      //如果出现错误，关闭管道
      console.log(err);
      await sendToWormhole(stream);
      ctx.body = {
        message: "上传失败",
      };
    }
  }
}

module.exports = UploaderController;
