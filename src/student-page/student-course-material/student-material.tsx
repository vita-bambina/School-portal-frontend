import { useState } from "react";
import Displaystudentcoursematerial from "./display-student-material";
function StudentCoursesMaterial() {
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <>
        <div className="school-admin-content">
          <div className="school-admin-body">
            <div className="school-admin-header">
              <h4>Course-Materials</h4>
            </div>

            <div className="searchbar">
              <input
                className="list-search"
                type="text"
                placeholder="Search this list"
              />

              <button> 2025/2026</button>
              <button> First Semester</button>
            </div>
            <div>
              <Displaystudentcoursematerial refresh={refresh} />
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default StudentCoursesMaterial;
