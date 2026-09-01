import "./lecturer-page.css";
import { Outlet } from "react-router-dom";
import LecturerSidebar from "./lecturer-sidebar";
import Topbar from "./lecturer-topbar";
function Lecturerpage() {
  return (
    <>
      <div className="lecturer-layout">
        <LecturerSidebar />
        <div className="lecturer-maincontent">
          <Topbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Lecturerpage;
