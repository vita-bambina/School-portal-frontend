import "../application.css";
// import { Outlet } from "react-router-dom";
import Programmedetails from "./programmeenrollmet";
// import { Link } from "react-router-dom";

interface BiodataProps {
  enrollment: any;
  handleSetEnrollment: (e: any) => void;
  nextStep: () => void;
  errors: string[];
}

function Programmedata({
  enrollment,
  handleSetEnrollment,
  nextStep,
  errors,
}: BiodataProps) {
  console.log(errors, "errors");
  return (
    <>
      <div className="Biodata-background">
        <div className="personal-details">
          <Programmedetails
            enrollment={enrollment}
            handleSetEnrollment={handleSetEnrollment}
            nextStep={nextStep}
          />
        </div>

        <div>
          {errors &&
            errors?.length > 0 &&
            errors?.map((error) => <p style={{ color: "red" }}>{error}</p>)}
        </div>
      </div>
    </>
  );
}
export default Programmedata;
