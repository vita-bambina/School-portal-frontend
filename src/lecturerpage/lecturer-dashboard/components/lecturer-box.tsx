import "./style.css";
import { useState, useEffect } from "react";
import { getlecturercoursecount } from "../../../api/lecturer.api";
function Lecturerbox() {
  const [activebox, setactivebox] = useState<number>(0);
  const [coursesByLevel, setcoursesByLevel] = useState<Record<string, number>>(
    {},
  );
  const [coursecount, setcoursecount] = useState(0);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getlecturercoursecount();

        setcoursecount(response.data.courseCount);
        setcoursesByLevel(response.data.coursesByLevel);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <div className="lecturerbox">
        <div className="lecturerbox-spacing">
          <div
            className={`boxes ${activebox === 0 ? "active" : ""}`}
            onClick={() => setactivebox(0)}
          >
            <p>{coursecount}</p>
            <p>courses</p>
            {Object.entries(coursesByLevel).map(([level, count]) => (
              <p key={level}>
                {count} {count === 1 ? "course" : "courses"} at {level}
              </p>
            ))}
          </div>
          <div
            className={`boxes ${activebox === 1 ? "active" : ""}`}
            onClick={() => setactivebox(1)}
          >
            <p> 312 </p>
            <p>Student</p>
            <p>Across all courses</p>
          </div>

          <div
            className={`boxes ${activebox === 2 ? "active" : ""}`}
            onClick={() => setactivebox(2)}
          >
            <p> 2025/26</p>
            <p>Sessions</p>
            <p>first semester</p>
          </div>
          <div
            className={`boxes ${activebox === 3 ? "active" : ""}`}
            onClick={() => setactivebox(3)}
          >
            <p> 9</p>
            <p>materials</p>
            <p> uploaded this semester</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Lecturerbox;
