import "./lecturer-style.css";
import DisplaylecturerCourses from "./display-lecturer-course";
import { useState } from "react";
function Lecturercourses() {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div className="lecturer-course-content">
        <div className="lecturer-courses-body">
          <div className="lecturer-courses-header">
            <h4>Assigned Courses</h4>
          </div>

          <div className="course-searchbar">
            <input
              className="list-search"
              type="text"
              placeholder="Search this list"
            />

            <button>Search</button>
          </div>
          <div>
            <DisplaylecturerCourses refresh={refresh} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Lecturercourses;
