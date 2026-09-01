import "./admin-lecturer.css";
import { useState } from "react";
import Assignlecturermodal from "./assign-lecturer";
import Displaylecturer from "./display-lecturer";
function Adminlecturer() {
  const [openmodal, setopenmodal] = useState(false);

  const [refresh] = useState(false);

  return (
    <>
      <div className="school-admin-content">
        <div className="school-admin-body">
          <div className="school-admin-header">
            <h4>Lecturer</h4>
            <p className="new-modal" onClick={() => setopenmodal(true)}>
              Assign lecturer
            </p>
          </div>
          <div className="searchbar">
            <input
              className="list-search"
              type="text"
              placeholder="Search this list"
            />
            <button className="search-btn"> Search</button>
          </div>
          <div>
            <Displaylecturer refresh={refresh} />
          </div>
          {openmodal && (
            <Assignlecturermodal
              onclose={() => setopenmodal(false)}
              open={openmodal}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Adminlecturer;
