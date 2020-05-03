import "../static/style/component/footer.css";
const Footer = () => (
  <div className="footer-div">
    <div>Lapsj.com</div>
    <a className="footer-a" href="http://www.beian.miit.gov.cn/">
      <img src={"/static/images/icp.png"}></img>
      <span className="footer-span">赣ICP备20003571号</span>
    </a>
  </div>
);

export default Footer;
