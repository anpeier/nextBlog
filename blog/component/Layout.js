import Background from "./Background";

const Layout = (props) => (
  <div>
    <Background />
    {props.children}
  </div>
);

export default Layout;
