// import "./admin-session.cs";
import { useState } from "react";
import AdmindisplayStudent from "./display-student";

function Adminstudents() {
  const [openmodal, setopenmodal] = useState(false);

  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <div className="school-admin-content">
        <div className="school-admin-body">
          <div className="school-admin-header">
            <h4>Students</h4>
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
            <AdmindisplayStudent refresh={refresh} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Adminstudents;
