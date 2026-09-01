import "../application.css";
import Personaldetails from "./Bioenrollment";
import { Link } from "react-router-dom";

interface BiodataProps {
  enrollment: any;
  handleSetEnrollment: (e: any) => void;
  nextStep: () => void;
}

function Biodata({ enrollment, handleSetEnrollment, nextStep }: BiodataProps) {
  return (
    <>
      <div className="Biodata-background">
        <div className="biodata-divider">
          <Personaldetails
            enrollment={enrollment}
            setenrollment={handleSetEnrollment}
            nextStep={nextStep}
          />
        </div>
      </div>
    </>
  );
}
export default Biodata;
