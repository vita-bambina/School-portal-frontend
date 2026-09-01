import { useEffect, useState } from "react";
import { getcoursematerial } from "../../api/student.api";

interface materialprops {
  refresh: boolean;
}
function Displaystudentcoursematerial({ refresh }: materialprops) {
  const [loading, setloading] = useState(false);
  const [maetrial, setmaterial] = useState<any[]>([]);

  const fetchmaterial = async () => {
    try {
      const response = await getcoursematerial();
      setmaterial(response.data);
      console.log("--------Sucesss---------", response.data);
    } catch (error) {
      console.log("-------error-------", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    setloading(true);
    const timer = setTimeout(() => {
      fetchmaterial();
    }, 2000);
    return () => clearTimeout(timer);
  }, [refresh]);
  return (
    <>
      <div>
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
                    <th>S/N</th>
                    <th>Material</th>
                    <th>Course</th>
                    <th>Lecturer</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {maetrial.length > 0 ? (
                    maetrial.map((material, index) => (
                      <tr key={material.id}>
                        <td>{index + 1}</td>

                        <td>{material.title}</td>

                        <td>
                          {material.lecturerCourse.course.code} -{" "}
                          {material.lecturerCourse.course.name}
                        </td>

                        <td>
                          {material.lecturerCourse.lecturer.user.firstname}{" "}
                          {material.lecturerCourse.lecturer.user.lastname}
                        </td>

                        <td>
                          {new Date(material.createdAt).toLocaleDateString()}
                        </td>

                        <td>
                          <button
                            className="view-btn"
                            onClick={() => window.open(material.file, "_blank")}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>No course materials available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Displaystudentcoursematerial;
