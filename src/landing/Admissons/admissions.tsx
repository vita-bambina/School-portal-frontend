import Navbar from "../componenets/navbar";
import "./admission.css";
import { useNavigate } from "react-router-dom";
function AdmissionPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="Admission-background">
        <div className="line-one">
          <hr />
        </div>
        <div className="Admission-body">
          <Navbar />
        </div>
        <div className="line-two">
          <hr />
        </div>

        <div className="admission-board">
          <div className="admission-banner-board-content">
            <h4>Admissions for</h4>
            <h4>2025/2026</h4>
            <p>What you need, what it costs and how long it takes</p>
            <div className="admissions-application-signin">
              <button
                className="admissions-application"
                onClick={() => navigate("/auth/register")}
              >
                Create An account
              </button>
            </div>
          </div>
        </div>
        <div className="Admission-body">
          <div className="requirements-details">
            <div className="requirements">
              <p>
                <b>Requirements</b>
              </p>
              <p className="req-req">
                Five O'level credit including English and Maths
              </p>
            </div>
            <div className="requirements">
              <p>
                <b>Required Documents</b>
              </p>
              <p className="req-req">
                O'level Result,birth certificate,phototgraph and JAMB slip
              </p>
            </div>
            <div className="requirements">
              <p>
                <b>Key details</b>
              </p>
              <p className="req-req">Application closes on 30 september</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdmissionPage;
