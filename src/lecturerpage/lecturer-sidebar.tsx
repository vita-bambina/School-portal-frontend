import logo from "../assets/images/school-logo.jpg";
import "./lecturer-page.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "../../src/logout/logout";
function LecturerSidebar() {
  const [openlogout, setopenlogout] = useState(false);
  return (
    <>
      <div className="lecturer-sidebar-background">
        <div className="lecturer-sidebar-body">
          <div className="lecturer-sidebar-logo">
            <img src={logo} alt="loading" />
            <p>Federal University</p>
          </div>
        </div>
        <div className="lecturer-sidebar-line">
          <hr />
        </div>
        <div className="lecturer-sidebar-body">
          <div className="content-adjustment">
            <Link to="/lecturer/dashboard">Dashboard</Link>
            <Link to="/lecturer/courses">Courses</Link>
            <Link to="/lecturer/course-material">Course-material</Link>
            <Link to="">Departments</Link>
            <Link to="">Profile</Link>
          </div>
        </div>
        {/*  */}
        <div className="sidebar-bottom">
          <hr />
          <div className="content-adjustment">
            <div>
              <p>Help & Support</p>
              <p onClick={() => setopenlogout(true)}> Signout</p>
            </div>
          </div>
        </div>
      </div>
      <Logout Showmodal={openlogout} setshowmodal={setopenlogout} />
    </>
  );
}

export default LecturerSidebar;
