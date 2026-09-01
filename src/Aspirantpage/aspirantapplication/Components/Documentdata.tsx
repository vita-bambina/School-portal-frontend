import "../application.css";
import Document from "./Document";

interface Documentdataprops {
  enrollment: any;
  handleSetEnrollment: (e: { target: { value: string; name: string } }) => void;
  nextStep: () => void;
}

function Documentdata({
  enrollment,
  handleSetEnrollment,
  nextStep,
}: Documentdataprops) {
  return (
    <>
      <div className="Biodata-background">
        <div className="personal-details">
          <Document
            enrollment={enrollment}
            handleSetEnrollment={handleSetEnrollment}
            nextStep={nextStep}
          />
        </div>
        <div className="Second-box"></div>
      </div>
    </>
  );
}
export default Documentdata;
