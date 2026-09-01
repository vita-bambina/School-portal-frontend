// import "./admin-lecturer.css";

import { useEffect, useState } from "react";
import { getLecturers } from "../../api/lecturer.api";
import Deletelecturer from "./delete-lecturer";
import Editlecturer from "./edit-lecturer";

interface lecturer {
  id: number;
  staffId: String;
  title: String;
  user: {
    firstname: String;
    lastname: String;
  };

  courses: {
    id: number;
    course: {
      department: {
        name: string;
      };
    };
  }[];
}

interface DisplaylecturerProps {
  refresh: Boolean;
}
function Displaylecturer({ refresh }: DisplaylecturerProps) {
  const [lecturer, setlecturer] = useState<lecturer[]>([]);
  const [loading, setloading] = useState(false);
  const [openedit, setopenedit] = useState(false);
  const [selectedlecturer, setselectedlecturer] = useState<any>(null);

  const removelecturer = (id: number) => {
    setlecturer((prev) => prev.filter((lecturer) => lecturer.id !== id));
  };

  const fetchdata = async () => {
    try {
      const response = await getLecturers();
      console.log(response.data);

      setlecturer(response.data);
    } catch (error) {
      console.log(error);
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
                  <th>Staff Id</th>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>No. of Courses</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {lecturer.map((lecturer, index) => (
                  <tr key={lecturer.id}>
                    <td>{index + 1}</td>

                    <td>{lecturer.staffId}</td>

                    <td>{lecturer.title}</td>

                    <td>
                      {lecturer.user.firstname} {lecturer.user.lastname}
                    </td>

                    <td>
                      {lecturer.courses.length > 0
                        ? lecturer.courses[0].course.department.name
                        : "Not assigned"}
                    </td>

                    <td>{lecturer.courses.length}</td>

                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          setselectedlecturer(lecturer);
                          setopenedit(true);
                        }}
                      >
                        Edit
                      </button>
                      <Deletelecturer
                        id={lecturer.id}
                        fetchlecturer={fetchdata}
                        removelecturer={removelecturer}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {openedit && selectedlecturer && (
          <Editlecturer
            selectlecturer={selectedlecturer}
            open={openedit}
            onclose={() => {
              setopenedit(false);
              fetchdata();
            }}
          />
        )}
      </div>
    </>
  );
}
export default Displaylecturer;
