import "./status.css";

import { useNavigate } from "react-router-dom";

function Informationcard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="aspirant-announcement-background">
        <div className="aspirant-background">
          <div className="aspirant-body">
            <div className="aspirant-header">
              <p>Application Checklist</p>
              <p onClick={() => navigate("/lecturer/courses")}>View All</p>
            </div>

            <div className="aspirant-content-one">
              <div className="asirant-avatar-styling">
                <p>PD</p>
              </div>
              <div className="aspirant-names">
                <p>Personal Details</p>
                <p className="aspirant-unit">
                  Surname, date of birth, next of kin
                </p>
              </div>
            </div>

            {/*  */}

            <div className="aspirant-content-one">
              <div className="asirant-avatar-styling">
                <p>PC</p>
              </div>
              <div className="aspirant-names">
                <p>Programme Choice</p>
                <p className="aspirant-unit">Computer science, microbiology</p>
              </div>
            </div>
            {/*  */}
            <div className="aspirant-content-one">
              <div className="asirant-avatar-styling">
                <p>D</p>
              </div>
              <div className="aspirant-names">
                <p>Documnets</p>
                <p className="aspirant-unit">jamb result, waec result</p>
              </div>
            </div>
          </div>
        </div>

        <div className="announcement-background">
          <div className="announcement-body">
            <div className="anouncement-header">
              <p>Announcement</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Informationcard;
