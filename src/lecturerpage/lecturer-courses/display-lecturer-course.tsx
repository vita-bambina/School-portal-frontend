import { getlecturercourse } from "../../api/lecturer.api";
import { useEffect, useState } from "react";

interface DisplaylecturerCourseProps {
  refresh: boolean;
}
function DisplaylecturerCourses({ refresh }: DisplaylecturerCourseProps) {
  const [lecturers, setlecturers] = useState<any[]>([]);
  const [loading, setloading] = useState(false);

  const lecturercourse = async () => {
    try {
      const response = await getlecturercourse();
      console.log("LECTURER COURSE RESPONSE:", response.data);
      setlecturers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    setloading(true);
    const timer = setTimeout(() => {
      lecturercourse();
    }, 2000);
    return () => clearTimeout(timer);
  }, [refresh]);

  return (
    <>
      <div className="lecturer-container">
        <div className="lecturer-table">
          {loading ? (
            <div className="skeleton-loader">
              {Array.from({ length: 6 }).map((item, index) => (
                <div key={index} className="skeleton-line" />
              ))}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Level</th>
                  <th>Department</th>
                  <th>Students</th>
                  <th>Materials</th>
                </tr>
              </thead>

              <tbody>
                {lecturers.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>{item.course.code}</td>

                    <td>{item.course.name}</td>

                    <td>{item.course.level.name}</td>

                    <td>{item.course.department.name}</td>

                    <td>{item.studentCount}</td>

                    <td>{item.materials.length}</td>
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
export default DisplaylecturerCourses;
