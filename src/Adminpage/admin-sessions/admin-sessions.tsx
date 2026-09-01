import "./admin-session.css";
import AddsessionsModal from "./add-sessions";
import { useState } from "react";
import Displaysessions from "./display-session";


function Adminsessions() {
  const [openmodal, setopenmodal] = useState(false);

  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <div className="school-admin-content">
        <div className="school-admin-body">
          <div className="school-admin-header">
            <h4>Academic Sessions</h4>
            <p className="new-modal" onClick={() => setopenmodal(true)}>
              New Session
            </p>
          </div>
          <div className="searchbar">
            <input
              className="list-search"
              type="text"
              placeholder="Search this list"
            />
            <button> Search</button>
          </div>
          <div>
            <Displaysessions refresh={refresh} />
          </div>

          <AddsessionsModal
            onclose={() => setopenmodal(false)}
            open={openmodal}
          />
        </div>
      </div>
    </>
  );
}
export default Adminsessions;
