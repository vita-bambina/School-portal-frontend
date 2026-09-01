import { Outlet } from "react-router-dom";
import Navbar from "./componenets/navbar";
import Banner from "./componenets/banner";
import "./mainlayout.css";
import Programmes from "./componenets/programmes";

function Landingpage() {
  return (
    <>
      <div className="background">
        <div className="line-one">
          <hr />
        </div>

        <div className="landing-pagebody">
          <Navbar />
        </div>
        <div className="line-two">
          <hr />
        </div>
        <Outlet />
        <Banner />
        <div className="landing-pagebody">
          <Programmes />
        </div>
      </div>
    </>
  );
}
export default Landingpage;
