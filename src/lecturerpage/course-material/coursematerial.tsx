// import "./lecturer-style.css"
import Displaycoursematerial from "./display-course-material";
import { useState } from "react";
import Addcoursematerial from "./add-course-material";
function Coursematerial() {
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lecturer-course-content">
        <div className="lecturer-courses-body">
          <div className="lecturer-courses-header">
            <h4>Course-materials</h4>
            <p className="new-course-material" onClick={() => setOpen(true)}>
              New Course-material
            </p>
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
            <Displaycoursematerial refresh={refresh} />
          </div>
        </div>
      </div>

      <Addcoursematerial
        open={open}
        closemodal={() => setOpen(false)}
        refreshaterial={() => setRefresh((prev) => !prev)}
      />
    </>
  );
}
export default Coursematerial;
