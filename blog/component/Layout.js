import Background from "./Background";
import Footer from "./Footer";
const Layout = (props) => (
  <div>
    <Background />
    {props.children}
    <Footer />
  </div>
);

export default Layout;
