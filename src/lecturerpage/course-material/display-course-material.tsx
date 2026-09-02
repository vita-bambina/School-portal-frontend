import { useEffect, useState } from "react";
import { getallcoursematerial } from "../../api/coursematerial";
import Deletecoursematerial from "./delete.course-material";
// import Coursematerial from "./coursematerial";

interface DisplayCourseMaterialProps {
  refresh: boolean;
}
function Displaycoursematerial({ refresh }: DisplayCourseMaterialProps) {
  const [loading, setloading] = useState(false);

  const [displaycourses, setdisplaycourses] = useState<any[]>([]);

  const fetchdata = async () => {
    try {
      const response = await getallcoursematerial();
      setdisplaycourses(response.data);
      console.log("----Sucesss----", response.data);
    } catch (error) {
      console.log("-----errror----", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    setloading(true);
    const timer = setTimeout(() => {
      fetchdata();
    }, 2000);
    return () => clearTimeout(timer);
  }, [refresh]);

  const removecoursematerial = (id: number) => {
    setdisplaycourses((prev) =>
      prev.filter((coursematerial) => coursematerial.id !== id),
    );
  };

  return (
    <>
      <div className="lecturer-container">
        <div className="lecturer-table">
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
                  <th>Material</th>
                  <th>Course</th>
                  <th>Course Code</th>
                  <th>Department</th>
                  <th>Level</th>
                  <th>Uploaded</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {displaycourses.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>

                    <td>{item.lecturerCourse.course.name}</td>

                    <td>{item.lecturerCourse.course.code}</td>

                    <td>{item.lecturerCourse.course.department.name}</td>

                    <td>{item.lecturerCourse.course.level.name}</td>

                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                    <td>
                      <button onClick={() => window.open(item.file, "_blank")}>
                        View
                      </button>

                      <Deletecoursematerial
                        id={item.id}
                        fetchcoursematerial={fetchdata}
                        removecoursematerial={removecoursematerial}
                      />
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
export default Displaycoursematerial;
