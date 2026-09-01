// import "./admin-session.css";
// import AddsessionsModal from "./add-sessions";
import { useState } from "react";
import DisplayAspirant from "./display-aspirant-table";

function Adminaspirant() {
  const [openmodal, setopenmodal] = useState(false);

  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <div className="school-admin-content">
        <div className="school-admin-body">
          <div className="school-admin-header">
            <h4>Applications</h4>
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
            <DisplayAspirant refresh={refresh} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Adminaspirant;
