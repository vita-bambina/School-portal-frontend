import { useNavigate } from "react-router-dom";
// import Register from "../Registration/register";
import "../mainlayout.css";

function Banner() {
  const navigate = useNavigate();
  return (
    <>
      <div className="banner-board">
        <div className="banner-board-content">
          <h4>Apply, learn and graduate </h4>
          <h4>- all in one portal</h4>
          <p>
            Admissions open for the 2025/2026 session. Create an account to
            start your application.
          </p>
          <div className="application-signin">
            <button
              className="application"
              onClick={() => navigate("/auth/register")}
            >
              Start an application
            </button>
            <button className="signin" onClick={() => navigate("/auth/login")}> Sign in</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Banner;
