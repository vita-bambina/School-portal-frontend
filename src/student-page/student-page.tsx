// import Adminsidebar from "./admin-sidebar";
import Topbar from "./topbar";
import Studentsidebar from "./student-page-sidebar";

import { Outlet } from "react-router-dom";

function Studenthomepage() {
  return (
    <>
      <div className="Admin-layout">
        <Studentsidebar />

        <div className="maincontent-layout">
          <Topbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default Studenthomepage;
