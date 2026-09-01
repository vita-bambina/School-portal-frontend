import { useState } from "react";
import logo from "../assets/images/school-logo.jpg";
import "./aspiranthomepage.css";
import { Link } from "react-router-dom";
import Logout from "../../src/logout/logout";

function Aspirantsidebar() {
  const [openlogout, setopenlogout] = useState(false);
  return (
    <>
      <div className="aspirant-sidebar">
        <div className="aspirantsidebar-adjustment">
          <div className="aspirant-logo-name">
            <img src={logo} alt="aspirant-logo-loading" />
            <h6>Federal University</h6>
          </div>
        </div>
        <div className="aspirant-line">
          <hr />
        </div>
        <div className="aspirantsidebar-adjustment">
          <div className="Structure">
            <Link to="/aspirant/status">Status</Link>
            <Link to="/aspirant/application">Application</Link>
            <Link to="/aspirant/profile">Profile</Link>
          </div>
        </div>

        <div className="sidebar-bottom">
          <hr />
          <div className="aspirantsidebar-adjustment">
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

export default Aspirantsidebar;
