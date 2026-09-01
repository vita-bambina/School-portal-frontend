import { useState, useEffect } from "react";
import { getDepartmentsdetails } from "../../api/department.api";
import { useNavigate, useParams } from "react-router-dom";

function DisplaydepartmentId() {
  const { facultyId } = useParams();
  const [loading, setloading] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchdata = async () => {
    try {
      const response = await getDepartmentsdetails(Number(facultyId));
      console.log("----Screaming-----success------", response.data);
      setDepartments(response.data);
    } catch (error) {
      console.log("-------Screaming errorr-------", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (!facultyId) return;

    setloading(true);
    const timer = setTimeout(() => {
      fetchdata();
    }, 1000);
    return () => clearTimeout(timer);
  }, [facultyId]);

  return (
    <>
      <div className="school-admin-container">
        <div className="school-admin-table">
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
                  <th>Department ID</th>
                  <th>Department</th>
                  <th>Code</th>
                  <th>Faculty</th>
                  <th>JAMB Cutoff</th>
                  <th>Minimum WAEC Aggregate</th>
                  <th>Levels</th>
                  <th>Students</th>
                  <th>Courses</th>
                  <th>Lecturers</th>
                </tr>
              </thead>

              <tbody>
                {departments.map((department) => (
                  <tr
                    key={department.id}
                    onClick={() => {
                      console.log("DEPARTMENT CLICKED:", department.id);
                      navigate(`/admin/departments/${department.id}/levels`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{department.id}</td>
                    <td>{department.name}</td>
                    <td>{department.code}</td>
                    <td>{department.faculty.name}</td>
                    <td>{department.jambCutOff}</td>
                    <td>{department.minimumWaecAggregate}</td>
                    <td>{department.levelCount}</td>
                    <td>{department.studentCount}</td>
                    <td>{department.courseCount}</td>
                    <td>{department.lecturerCount}</td>
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

export default DisplaydepartmentId;
