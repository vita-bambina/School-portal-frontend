import "./style.css";
import { getstudentprofile} from "../../../api/student.api";
import { useEffect, useState } from "react";

function Levelbox() {
  const [level, setlevel] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getstudentprofile();

        console.log("STUDENT PROFILE:", response.data);

        setlevel(response.data.level.name);
      } catch (error) {
        console.log("FAILED TO FETCH STUDENT PROFILE:", error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <>
      <div className="containers">
        <div className="container-spacing">
          <div className="box-one">
            <p className="main-one">{level}</p>
            <p className="second-option">Level</p>
          </div>
          <div className="box-one">
            <p className="main-one">2025/26</p>
            <p className="second-option">Sessions</p>
          </div>
          <div className="box-one">
            <p className="main-one">#42,500</p>
            <p className="second-option">Outstanding</p>
          </div>
          <div className="box-one">
            <p className="main-one">Pending</p>
            <p className="second-option">Clearance</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Levelbox;
