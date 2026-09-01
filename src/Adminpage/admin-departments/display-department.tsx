import { useEffect, useState } from "react";
import { getDepartments } from "../../api/department.api";
import DeleteDepartment from "./delete-departments";
import { useNavigate } from "react-router-dom";
import Editdepartment from "./edit-department";

interface DisplayDepartmentProps {
  refresh: boolean;
}

function Displaydepartments({ refresh }: DisplayDepartmentProps) {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [setedit, setopenedit] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const removeDepartment = (id: number) => {
    setDepartments((prev) => prev.filter((department) => department.id !== id));
  };

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();

      setDepartments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchDepartments();
    }, 2000);
    return () => clearTimeout(timer);
  }, [refresh]);

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
                  <th>S/N</th>
                  <th>Department</th>
                  <th>Code</th>
                  <th>Faculty</th>
                  <th>Levels</th>
                  <th>Courses</th>
                  <th>Students</th>
                  <th>Actions</th>
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

                    <td>{department._count.levels}</td>

                    <td>{department._count.courses}</td>

                    <td>{department._count.students}</td>

                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => {
                          console.log("SELECTED:", department);

                          setSelectedDepartment(department);
                          setopenedit(true);
                        }}
                      >
                        Edit
                      </button>

                      <DeleteDepartment
                        id={department.id}
                        fetchDepartments={fetchDepartments}
                        removeDepartment={removeDepartment}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {setedit && selectedDepartment && (
          <Editdepartment
            selectdepartment={selectedDepartment}
            closeModal={() => setopenedit(false)}
            refreshDepartments={fetchDepartments}
          />
        )}
      </div>
    </>
  );
}

export default Displaydepartments;
