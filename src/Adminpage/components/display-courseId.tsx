import { useEffect, useState } from "react";
import { getcoursedetails } from "../../api/course.api";
import { useParams } from "react-router-dom";

function DisplaycourseId() {
  const [loading, setloading] = useState(false);
  const [displaylevel, setdisplaylevel] = useState<any[]>([]);
  const [activesemester, setactivesemester] = useState("first");
  const { levelId } = useParams();

  const fetchdata = async () => {
    try {
      const response = await getcoursedetails(Number(levelId));
      setdisplaylevel(response.data);
      console.log("-----Screaming-----Successsssss----", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (!levelId) return;

    setloading(true);
    const timer = setTimeout(() => {
      fetchdata();
    }, 1000);
    return () => clearTimeout(timer);
  }, [levelId]);
  const firstSemester = displaylevel.filter(
    (course) => course.semester?.semester === "first_semester",
  );

  const secondSemester = displaylevel.filter(
    (course) => course.semester?.semester === "second_semester",
  );

  return (
    <>
      <div className="school-admin-container">
        <div className="school-admin-table">
          {loading ? (
            <div className="skeleton-loader">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-line" />
              ))}
            </div>
          ) : (
            <div className="course-container">
              <button
                className={activesemester === "first" ? "active" : ""}
                onClick={() => {
                  setactivesemester("first");
                }}
              >
                First Semester Courses
              </button>

              <button
                className={activesemester === "second" ? "active" : ""}
                onClick={() => {
                  setactivesemester("second");
                }}
              >
                Second Semester Courses
              </button>
              {/* FIRST SEMESTER */}

              {activesemester === "first" && (
                <div className="semester-section">
                  <table>
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Course code</th>
                        <th>Course title</th>
                        <th>Course unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {firstSemester.map((course) => (
                        <tr key={course.id}>
                          <td>{course.id}</td>
                          <td>{course.code}</td>
                          <td>{course.name}</td>
                          <td>{course.courseunit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SECOND SEMESTER */}
              {activesemester === "second" && (
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Course code</th>
                      <th>Course title</th>
                      <th>Course unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondSemester.map((course) => (
                      <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.code}</td>
                        <td>{course.name}</td>
                        <td>{course.courseunit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default DisplaycourseId;
