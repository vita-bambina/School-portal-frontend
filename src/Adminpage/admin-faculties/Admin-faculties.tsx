import "./admin-faculties.css";
// import "./admin-faculties.css";
import Displayfaculties from "./display-faculties";
import Addfaculty from "./Add-faculty";
import { useState } from "react";

function Adminfaculties() {
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleFacultyAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="school-admin-content">
        <div className="school-admin-body">
          <div className="school-admin-header">
            <h4>Faculties</h4>
            <p className="new-modal" onClick={() => setOpenModal(true)}>
              New Faculty
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
            <Displayfaculties refresh={refresh} />
          </div>
          {openModal && (
            <Addfaculty
              open
              closeModal={() => setOpenModal(false)}
              onSuccess={handleFacultyAdded}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Adminfaculties;
