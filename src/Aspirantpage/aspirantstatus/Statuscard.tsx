import { useEffect, useState } from "react";
import "./status.css";
import { getCurrentEnrollment } from "../../api/enrollment.api";
// interface StatuscardProps {
//   enrollment: any;
// }
function Statuscard() {
  // console.log("ENROLLMENT IN STATUSCARD:", enrollment);

  const [enrollment, setEnrollment] = useState<any>(null);

  const getEnrollment = async () => {
    try {
      const response = await getCurrentEnrollment();

      console.log("ENROLLMENT IN STATUSCARD:", response);

      setEnrollment(response);
    } catch (error) {
      console.error("Failed to get enrollment:", error);
    }
  };

  useEffect(() => {
    getEnrollment();
  }, []);

  if (!enrollment) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="statuscard">
        <div className="statuscard-one">
          <p>
            {" "}
            <b>{enrollment.status}</b>
          </p>
          <p className="second-step">Status</p>
        </div>
        <div className="statuscard-one">
          <p>
            <b>{enrollment.currentStep} of 3</b>{" "}
          </p>
          <p className="second-step">Steps done</p>
        </div>
        <div className="statuscard-one">
          <p>
            {" "}
            <b>30 of Sept</b>
          </p>
          <p className="second-step">Closes</p>
        </div>
        <div className="statuscard-one">
          <p>
            {" "}
            <b>{enrollment.referenceNumber} </b>
          </p>
          <p className="second-step">Reference</p>
        </div>
      </div>
    </>
  );
}

export default Statuscard;
