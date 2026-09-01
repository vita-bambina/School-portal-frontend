import logo from "../assets/images/school-logo.jpg";
import "./home-page.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "../logout/logout";
// import { useNavigate } from "react-router-dom";
function Adminsidebar() {
  // const location = useLocation();

  // const isActive = (path: string) => location.pathname === path;
  const [openlogout, setopenlogout] = useState(false);
  return (
    <>
      <div className="Admin-sidebar">
        <div className="Adminsidebar-adjustment">
          <div className="admin-logo-name">
            <img src={logo} alt="admin-logo-loading" />
            <h6>Federal University</h6>
          </div>
        </div>
        <div className="line">
          <hr />
        </div>
        <div className="Adminsidebar-adjustment">
          <div className="subtitle-head">
            <p>STRUCTURE</p>
            <div className="admin-links">
              <Link to="/admin/faculties">Faculties</Link>
              <Link to="departments">Departments</Link>
              <Link to="levels">Levels</Link>
              <Link to="courses">Courses</Link>
              <Link to="sessions">Sessions</Link>
            </div>
          </div>
          <div className="subtitle-head">
            <p>PEOPLE</p>
            <div className="admin-links">
              <Link to="admin_aspirant">Aspirant</Link>
              <Link to="/admin/students"> Students</Link>
              <Link to="/admin/lecturer">Lecturers</Link>
            </div>
          </div>
          <div className="subtitle-head">
            <p>OPERATIONS</p>
            <div className="admin-links">
              <Link to="noneyet"> Payments</Link>
              <Link to="noneyet"> Clearance</Link>
              <Link to="noneyet"> Results</Link>
            </div>
          </div>
        </div>
        <div className="sidebar-bottom">
          <hr />
          <div className="Adminsidebar-adjustment">
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
export default Adminsidebar;
