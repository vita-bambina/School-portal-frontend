import { useEffect, useState } from "react";
import { getsession } from "../../api/session.api";
import "./admin-session.css";
import Deletesession from "./delete-session";
import EditSession from "./edit-session";
interface sessions {
  id: number;
  year: string;
  startdate: string;
  enddate: string;
}
interface DisplaysessionProps {
  refresh: Boolean;
}

function Displaysessions({ refresh }: DisplaysessionProps) {
  const [sessions, setsession] = useState<sessions[]>([]);
  const [loading, setloading] = useState(false);
  const [selectsession, setselectsession] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const removesessions = (id: number) => {
    setsession((prev) => prev.filter((session) => session.id !== id));
  };

  const fetchsessions = async () => {
    try {
      const response = await getsession();
      console.log(response.data);
      setsession(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    setloading(true);
    const timer = setTimeout(() => {
      fetchsessions();
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
                  <th>Session</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.id} </td>
                    <td>{session.year}</td>

                    <td>{session.startdate}</td>

                    <td>{session.enddate}</td>

                    <td>
                      <button
                        onClick={() => {
                          setselectsession(session);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <Deletesession
                        id={session.id}
                        fetchsessions={fetchsessions}
                        removesessions={removesessions}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {selectsession && (
          <EditSession
            selectsession={selectsession}
            open={open}
            onclose={() => setOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default Displaysessions;
