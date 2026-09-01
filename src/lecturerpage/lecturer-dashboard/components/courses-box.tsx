import "./style.css";
import { getlecturercourse } from "../../../api/lecturer.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Coursesbox() {
  const [lecturercourse, setlecturercourse] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchdata = async () => {
    try {
      const response = await getlecturercourse();
      console.log("-----screaming successss------", response.data);
      setlecturercourse(response.data);
    } catch (error) {
      console.log("---------screaming error-----------", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <div className="courses-announcement-background">
        <div className="courses-background">
          <div className="courses-body">
            <div className="courses-header">
              <p>Your courses</p>
              <p onClick={() => navigate("/lecturer/courses")}>View All</p>
            </div>
            {lecturercourse.map((item) => (
              <div className="content-one">
                <div className="avatar-styling">
                  <p>{item.course.code.slice(0, 2)}</p>
                </div>
                <div className="courses-names">
                  <p>
                    {item.course.code} - {item.course.name}
                  </p>
                  <p className="course-unit">
                    {" "}
                    {item.course.level.name} · {item.course.courseunit} units
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="announcement-background">
          <div className="announcement-body">
            <div className="anouncement-header">
              <p>Announcement</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Coursesbox;
