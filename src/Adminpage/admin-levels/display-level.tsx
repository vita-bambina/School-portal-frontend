import { useEffect, useState } from "react";
import { getLevelSummary } from "../../api/level.api.";
import DeleteLevel from "./delete-level";
import Editlevel from "./edit-level";
import "./admin-level.css";

interface levelsummary {
  id: number;
  level: string;
  totalStudents: number;
  totalCourses: number;
}

interface DisplayLevelProps {
  refresh: boolean;
}

function Displaylevel({ refresh }: DisplayLevelProps) {
  const [levels, setLevels] = useState<levelsummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [openedit, setOpenedit] = useState(false);
  const [selectedlevel, setSelectedlevel] = useState<any>(null);

  const fetchLevels = async () => {
    try {
      const response = await getLevelSummary();
      console.log(response.data);
      console.log("FULL RESPONSE:", response);
      console.log("RESPONSE DATA:", response.data);

      setLevels(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchLevels();
    }, 2000);
    return () => clearTimeout(timer);
  }, [refresh]);

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

                  <th>Level</th>

                  <th>Total Students</th>

                  <th>Total Courses</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {levels.map((level) => (
                  <tr key={level.id}>
                    <td>{level.id}</td>

                    <td>{level.level}</td>

                    <td>{level.totalStudents ?? 0}</td>

                    <td>{level.totalCourses ?? 0}</td>

                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedlevel(level);
                          setOpenedit(true);
                        }}
                      >
                        Edit
                      </button>

                      <DeleteLevel id={level.id} fetchLevels={fetchLevels} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {openedit && selectedlevel && (
          <Editlevel
            selectlevel={selectedlevel}
            closeModal={() => setOpenedit(false)}
            refreshDepartments={fetchLevels}
          />
        )}
      </div>
    </>
  );
}

export default Displaylevel;
