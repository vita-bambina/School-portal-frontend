import { useEffect, useState } from "react";
import { getlevelsId } from "../../api/level.api.";
import { useNavigate, useParams } from "react-router-dom";

function DisplaylevelsID() {
  const [loading, setloading] = useState(false);
  const [levelsId, setlevelsId] = useState<any[]>([]);
  const { departmentId } = useParams();
  const navigate = useNavigate();
  console.log("DEPARTMENT ID:", departmentId);

  const fetchdata = async () => {
    try {
      const response = await getlevelsId(Number(departmentId));
      console.log("------screaming level side clicked------", response.data);
      setlevelsId(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (!departmentId) return;
    setloading(true);
    const timer = setTimeout(() => {
      fetchdata();
    }, 1000);
    return () => clearTimeout(timer);
  }, [departmentId]);

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
                  <th>Level</th>
                </tr>
              </thead>

              <tbody>
                {levelsId.map((level, index) => (
                  <tr
                    key={level.id}
                    onClick={() => {
                      console.log("DEPARTMENT CLICKED:", level.id);
                      navigate(`/admin/levels/${level.id}/courses`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{index + 1}</td>
                    <td>{level.department.name}</td>
                    <td>{level.name}</td>
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

export default DisplaylevelsID;
