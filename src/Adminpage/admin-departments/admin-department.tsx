import { useState } from "react";
import Displaydepartments from "./display-department";
import AddDepartment from "./add-department";
import "./admin-departments.css"

function Admindepartments() {
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refreshDepartments = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <div className="school-admin-content">
        <div className="school-admin-body">
          <div className="school-admin-header">
            <h4>Departments</h4>
            <p className="new-modal" onClick={() => setOpenModal(true)}>
              New Department
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
            <Displaydepartments refresh={refresh} />
          </div>
          {openModal && (
            <AddDepartment
              refreshDepartments={refreshDepartments}
              closeModal={() => setOpenModal(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Admindepartments;
