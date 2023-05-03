import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import Footer from "./footer-component";
import "../styles/style.css";

const Layout = (props) => {
  let {
    currentUser,
    setCurrentUser,
    colorHome,
    colorPrice,
    colorProfile,
    colorData,
  } = props;

  return (
    <>
      <Nav
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        colorHome={colorHome}
        colorPrice={colorPrice}
        colorProfile={colorProfile}
        colorData={colorData}
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
