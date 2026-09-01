import logo from "../../assets/images/school-logo.jpg";
import "./componenets.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar-lines">
        <div className="navbar-componenets">
          <div className="sch-logo-name">
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="School-logo-loading"
            />
            <h6>Federal University</h6>
          </div>

          <div className="programmes-admissions">
            <p onClick={() => navigate("/programmes")}>Programmes </p>
            <p onClick={() => navigate("/Admission")}>Admissions </p>
            <p>Contact</p>
            <p className="navbarSignin" onClick={() => navigate("/auth/login")}>
              Sign in
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
