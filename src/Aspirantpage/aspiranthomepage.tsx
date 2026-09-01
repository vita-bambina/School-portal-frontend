import { Outlet } from "react-router-dom";
import Aspirantsidebar from "./aspirantsidebar";
import Topbar from "./topbar";
import "./aspiranthomepage.css";

function Aspiranthomepage() {
  return (
    <>
      <div className="aspirant-layout">
        <Aspirantsidebar />

        <div className="aspirant-maincontent-layout">
          <Topbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default Aspiranthomepage;
