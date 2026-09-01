import { useEffect, useState } from "react";
import { getallstudent } from "../../api/student.api";

function AdmindisplayStudent() {
  const [loading, setloading] = useState(false);
  const [display, setdisplay] = useState<any[]>([]);

  const fetchdata = async () => {
    try {
      const response = await getallstudent();
      console.log("-----Screaming--------successs----", response.data);
      setdisplay(response.data);
    } catch (error) {
      console.log("--------Screaming-----e--r--r--o--r", error);
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
  }, []);

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
                  <th>Student Name</th>
                  <th>Matric Number</th>
                  <th>Department</th>
                  <th>Level</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {display.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>
                      {student.user?.firstname} {student.user?.lastname}
                    </td>
                    <td>{student.studentNumber || "Not assigned"}</td>
                    <td>{student.department?.name || "Not assigned"}</td>
                    <td>{student.level?.name || "Not assigned"}</td>
                    <td>{student.user?.email || "No email"}</td>
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

export default AdmindisplayStudent;
