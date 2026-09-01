import { useState, useEffect } from "react";
import { getstudent } from "../../api/student.api";
import "./student-courses.css";

interface DisplayStudentCourseProps {
  refresh: boolean;
}
function Displaystudentcourse({ refresh }: DisplayStudentCourseProps) {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getstudentcourses = async () => {
    try {
      const response = await getstudent();

      setCourses(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      getstudentcourses();
    }, 2000);
    return () => clearTimeout(timer);
  }, [refresh]);

  return (
    <>
      <div className="student-table-container">
        <div className="student-table">
          {loading ? (
            <div className="skeleton-loader">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-line" />
              ))}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Course code</th>
                  <th>Course title</th>
                  <th>Course Unit</th>
                  <th>Lecturer</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.code}</td>

                    <td>{course.name}</td>

                    <td>{course.courseunit}</td>

                    <td>
                      {course.lecturers.map((item: any) => (
                        <div key={item.id}>
                          {item.lecturer.user.firstname}{" "}
                          {item.lecturer.user.lastname}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
export default Displaystudentcourse;
