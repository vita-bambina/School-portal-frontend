import "./dasboard.css";
import "./components/style.css";
import "./components/lecturer-box";
import Lecturerbox from "./components/lecturer-box";
import Coursesbox from "./components/courses-box";

import { getparticularuser } from "../../api/auth.api";
import { useEffect, useState } from "react";

function Lecturerdashboard() {
  const [lecturerdata, setlecturerdata] = useState<any>(null);

  const fetchdata = async () => {
    try {
      const response = await getparticularuser();
      setlecturerdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <div className="lecturer-dashboard-bacgrd">
        <div className="leturer-bdy">
          <div className="lecturer-dashboard-header">
            <p>
              Welcome {lecturerdata?.firstname} {lecturerdata?.lastname}
            </p>
            <p>View All Courses</p>
          </div>
          <Lecturerbox />
          <div>
            <Coursesbox />
          </div>
        </div>
      </div>
    </>
  );
}
export default Lecturerdashboard;
