import Levelbox from "./components/level-box";
import "./student-dashboard.css";
import { getparticularuser } from "../../api/auth.api";
import { useState, useEffect } from "react";
import Announcements from "./components/annuncements";

function StudentDashboard() {
  const [studentinfo, setstudentinfo] = useState<any>(null);

  const fetchdata = async () => {
    try {
      const response = await getparticularuser();
      setstudentinfo(response.data);
      console.log(response.data);
      console.log("STUDENT INFO RESPONSE:", response.data);
      console.log("FIRST NAME:", response.data.firstname);
      console.log("LAST NAME:", response.data.lastname);
    } catch (error) {
      console.log(error, "------error------");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <div className="student-dashboard-backgrd">
        <div className="student-dashboard-bdy">
          <div className="Student-dashboard-header">
            <h4> Welcome back {studentinfo?.firstname} {studentinfo?.lastname}</h4>
          </div>
          <Levelbox />
          <Announcements />
        </div>
      </div>
    </>
  );
}
export default StudentDashboard;
