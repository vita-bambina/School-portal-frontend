import Adminsidebar from "./admin-sidebar";
import Topbar from "./topbar";
// import Adminfaculties from "./adminfaculties/Adminfaculties";
// import Admindepartments from "./admindepartments/Admindepartment"

import { Outlet } from "react-router-dom";
function Schooladminhomepage() {
  return (
    <>
      <div className="Admin-layout">
        <Adminsidebar />

        
        <div className="maincontent-layout">
            <Topbar />
            <Outlet />
         
        </div>
      </div>
    </>
  );
}
export default Schooladminhomepage;
