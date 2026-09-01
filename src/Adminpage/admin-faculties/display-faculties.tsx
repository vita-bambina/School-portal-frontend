import { useEffect, useState } from "react";
import { getFaculties } from "../../api/faculty.api";
import Deletefaculty from "./Delete-faculty";
import { useNavigate } from "react-router-dom";
import Editfaculty from "./edit-faculty";

interface DisplayFacultyProps {
  refresh: boolean;
}

function Displayfaculties({ refresh }: DisplayFacultyProps) {
  const [faculties, setfaculties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openedit, setopenedit] = useState(false);
  const [selectedfaculty, setselectedfaculty] = useState();

  const navigate = useNavigate();

  const removeFaculty = (id: number) => {
    setfaculties((prev) => prev.filter((faculty) => faculty.id !== id));
  };

  const fetchFaculties = async () => {
    try {
      const response = await getFaculties();

      setfaculties(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchFaculties();
    }, 2000);
    return () => clearTimeout(timer);
  }, [refresh]);

  //   const handleDelete = (id: number) => {
  //     console.log(id);
  //   };
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
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Departments</th>
                  <th>Students</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {faculties.map((faculty) => (
                  <tr
                    key={faculty.id}
                    onClick={() =>
                      navigate(`/admin/faculties/${faculty.id}/departments`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td>{faculty.id}</td>
                    <td>{faculty.name}</td>
                    <td>{faculty.code}</td>
                    <td>{faculty._count.departments}</td>
                    <td>{faculty.studentcount}</td>

                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => {
                          setselectedfaculty(faculty);
                          setopenedit(true);
                        }}
                      >
                        Edit
                      </button>
                      <Deletefaculty
                        id={faculty.id}
                        fetchFaculties={fetchFaculties}
                        removeFaculty={removeFaculty}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {openedit && selectedfaculty && (
            <Editfaculty
              selectfaculty={selectedfaculty}
              closeModal={() => setopenedit(false)}
              refreshDepartments={fetchFaculties}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Displayfaculties;
