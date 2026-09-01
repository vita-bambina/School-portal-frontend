import "./admin.css";
import { useState } from "react";
import AddCourse from "./add-courses";
import DisplayCourse from "./display-courses";

function AdminCourses() {
  const [openModal, setOpenModal] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const handleCourseAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="school-admin-content">
        <div className="school-admin-body">
          <div className="school-admin-header">
            <h4>Courses</h4>

            <p className="new-modal" onClick={() => setOpenModal(true)}>
              New Course
            </p>
          </div>

          <div className="searchbar">
            <input
              className="list-search"
              type="text"
              placeholder="Search this list"
            />

            <button>Search</button>
            <button> All departments</button>
            <button> All levels</button>
            <button> All levels</button>
          </div>

          <div>
            <DisplayCourse refresh={refresh} />
          </div>

          {openModal && (
            <AddCourse
              open
              closeModal={() => setOpenModal(false)}
              onSuccess={handleCourseAdded}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminCourses;
