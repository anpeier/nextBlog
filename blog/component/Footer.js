import "../static/style/component/footer.css";
import { TeamOutlined, EyeFilled } from "@ant-design/icons";
import moment from "moment";
import { useState, useEffect } from "react";

const Footer = () => {
  const startTime = new Date("2019/02/03 00:00:00");
  const [time, setTime] = useState(moment.duration(new Date() - startTime)._data);
  useEffect(() => {
    setInterval(() => {
      setTime(moment.duration(new Date() - startTime)._data);
    }, 1000);
  }, []);
  return (
    <div className="footer-div">
      <div>
        Copyright <span>© 2019 - 2020</span>{" "}
        <a href="https://lapsj.cn/">罗安培</a> | 欢迎访问本站
      </div>
      <div>
        <EyeFilled /> 总访问量
        <span style={{ display: "none" }} id="busuanzi_value_site_pv"></span>次
        &nbsp;|&nbsp;
        <TeamOutlined /> 访客数
        <span style={{ display: "none" }} id="busuanzi_value_site_uv"></span>
        人次
      </div>
      <div>
        本站已小心翼翼运行:{` ${time.years} 年 `}
        {` ${time.months} 月 `}
        {` ${time.days} 天 `}
        {time.hours} 时 {time.minutes} 分 {time.seconds} 秒
      </div>
      <a className="footer-a" href="http://www.beian.miit.gov.cn/">
        <img src={"/static/images/icp.png"}></img>
        <span className="footer-span">赣ICP备20003571号</span>
      </a>
      <script
        async
        src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
      ></script>
    </div>
  );
};

export default Footer;
