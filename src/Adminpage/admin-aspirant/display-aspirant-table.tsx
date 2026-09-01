import { useEffect, useState } from "react";
import { getallenrollment } from "../../api/enrollment.api";
import { useNavigate } from "react-router-dom";

interface Displayaspirant {
  id: number;
  referenceNumber: string;
  firstName: string;
  lastName: string;
  otherName: string;

  status: string;
}
interface DisplaysaspirantProps {
  refresh: boolean;
}

function DisplayAspirant({ refresh }: DisplaysaspirantProps) {
  const navigate = useNavigate();
  const [aspirant, setAspirant] = useState<Displayaspirant[]>([]);

  const [loading, setloading] = useState(false);

  const fetchdata = async () => {
    try {
      const response = await getallenrollment();
      console.log("ALL APPLICANTS:", response);

      setAspirant(response);
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
      <div>
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
                    <th>Reference Number</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {aspirant.map((aspirant) => (
                    <tr key={aspirant.id}>
                      <td>{aspirant.id}</td>

                      <td>{aspirant.referenceNumber}</td>
                      <td>
                        {aspirant.firstName} {aspirant.lastName}
                      </td>

                      <td>{aspirant.status}</td>

                      <td>
                        <button
                          onClick={() =>
                            navigate(`/admin/admin_aspirant/${aspirant.id}`)
                          }
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayAspirant;
