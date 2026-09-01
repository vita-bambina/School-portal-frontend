import logo from "../assets/images/school-logo.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./student-page.css";
import Logout from "../../src/logout/logout";

function Studentsidebar() {
  const [openlogout, setopenlogout] = useState(false);
  return (
    <>
      <div className="student-sidebar">
        <div className="student-adjustment">
          <div className="student-logo-name">
            <img src={logo} alt="student-logo-loading" />
            <h6>Federal University</h6>
          </div>
        </div>
        <div className="line">
          <hr />
        </div>
        <div className="student-adjustment">
          <div className="subtitle-head">
            <div className="admin-links">
              <Link to="/student/dashboard">Dashboards</Link>
              <Link to="/student/courses">Courses</Link>
              <Link to="/student/course-material">Materials</Link>
              <Link to="">Results</Link>
              <Link to="">Payments</Link>
              <Link to="">Clearance</Link>
              <Link to="">Profile</Link>
            </div>
          </div>
        </div>
        <div className="sidebar-bottom">
          <hr />
          <div className="student-adjustment">
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
export default Studentsidebar;
