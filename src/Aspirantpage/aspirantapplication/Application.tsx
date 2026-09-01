import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  startEnrollment,
  getCurrentEnrollment,
  updateEnrollment,
  submitEnrollment,
} from "../../api/enrollment.api";
import "./application.css";
import Biodata from "./Components/Biodata";
import Programmedata from "./Components/programmedata";
import Documentdata from "./Components/Documentdata";

interface IEnrollment {
  firstName: String;
  lastName: String;
  otherName: String;
  gender: String;
  dateOfBirth: String;
  phone: String;
  address: String;
  country: String;
  stateOfOrigin: String;
  ninNumber: string;
  lga: String;
  currentState: String;
  currentstateLGA: String;
  facultyId: Number;
  departmentId: Number;
  jambRegistrationNumber: String;
  jambScore: Number;
  waecAggregate: Number;
  passportPhoto: String;
  birthCertificate: String;
  waecResult: String;
  jambResult: String;
  status: "PENDING" | "APPROVED" | "REJECTED" | "IN_PROGRESS";
}

const enrollmentForm: IEnrollment = {
  firstName: "",
  lastName: "",
  otherName: "",
  gender: "",
  dateOfBirth: "",
  phone: "",
  address: "",
  country: "",
  stateOfOrigin: "",
  lga: "",
  ninNumber: "",
  currentState: "",
  currentstateLGA: "",
  facultyId: 0,
  departmentId: 0,
  jambRegistrationNumber: "",
  jambScore: 0,
  waecAggregate: 0,
  passportPhoto: "",
  birthCertificate: "",
  waecResult: "",
  jambResult: "",
  status: "IN_PROGRESS",
};

function Application() {
  const [enrollment, setenrollment] = useState(enrollmentForm);
  const [errors, setErrors] = useState([]);
  const [enrollmentId, setenrollmentId] = useState<number | null>(null);
  const [step, setStep] = useState<number>();
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const [pendingloading, setpendingloading] = useState<boolean>(true);

  // const [url, setL] = useState<boolean>(true);

  const getformupdate = async () => {
    try {
      setLoading(true);
      const response = await getCurrentEnrollment();
      setLoading(false);
      console.log("CURRENT ENROLLMENT:", response);
      console.log("ENROLLMENT STATUS:", response?.status);
      console.log("CURRENT ENROLLMENT:", response);
      if (response) {
        setenrollmentId(response.id);

        setenrollment((prev) => ({
          ...prev,
          ...response,
        }));
        // setIsPending(response.status === "IN-PROGRESS" ? true : false);

        // setIsPending(response.status === "PENDING");

        if (response.status === "PENDING") {
          setIsPending(true);
        }

        setStep(response.currentStep);
      } else {
        const draft = await startEnrollment();

        setenrollmentId(draft.id);
        setStep(draft.currentStep);
      }
    } catch (error) {
      console.error("Failed to initialize enrollment:", error);
    }
  };

  useEffect(() => {
    getformupdate();
  }, []);

  const handleSetEnrollment = (e: any) => {
    setenrollment((prev) => {
      let value = e.target.value;
      const target = e.target.name;

      console.log(target, value, "value ------");
      if (target === "jambScore") {
        value = Number(value);
      }
      if (target === "waecAggregate") {
        value = Number(value);
      }
      if (target === "facultyId") {
        value = Number(value);
      }
      if (target === "departmentId") {
        value = Number(value);
      }
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmiting(true);
      const response = await nextStep("submit");
      setSubmiting(false);
      console.log("Enrollment submitted successfully:", response);
    } catch (error) {
      console.error("Failed to submit enrollment:", error);
    }
  };

  const nextStep = async (isSubmit = "") => {
    const next = (step ?? 1) + 1;
    console.log("data being sent to prisma", enrollment);

    try {
      setSubmiting(true);
      const res = await updateEnrollment(enrollment, isSubmit === "submit");
      console.log(isSubmit, "isSubmit ------ res");
      if (res.error) {
        console.error("---------------error:");
        setErrors(res.error);
        return;
      } else {
        console.error("--------------- no error:");
        if (isSubmit === "submit") {
          setIsPending(true);
        }
        // setSubmiting(true);
        setStep(next);
      }
    } catch (error: any) {
      console.error("Failed to save enrollment:", error);
    }
  };

  const prevStep = () => {
    setStep((prev: any) => prev - 1);
  };

  const handleSetStep = (val: number) => {
    setStep(val);
  };

  if (loading) {
    return (
      <div>
        <p>Loading .......</p>
      </div>
    );
  }
  if (isPending) {
    return (
      <div>
        <p>
          Hello {enrollment.firstName} {enrollment.lastName}
        </p>
        <p>Your application is under review</p>
        <p>Kindly checkback later.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="bio-data-body">
          <div className="stepper">
            <button
              className={step === 1 ? "step-btn active" : "step-btn"}
              onClick={() => handleSetStep(1)}
            >
              <span className="stepper-circle">1</span>
              <p>Biodata</p>
            </button>

            <div className="stepper-line" />
            <button
              className={step === 2 ? "step-btn active" : "step-btn"}
              onClick={() => handleSetStep(2)}
            >
              <span className="stepper-circle">2</span>
              <p>Programme</p>
            </button>
            <div className="stepper-line" />
            <button
              className={step === 3 ? "step-btn active" : "step-btn"}
              onClick={() => handleSetStep(3)}
            >
              <span className="stepper-circle">3</span>
              <p>Document</p>
            </button>
          </div>
        </div>
      </div>
      {step === 1 ? (
        <Biodata
          enrollment={enrollment}
          handleSetEnrollment={handleSetEnrollment}
          nextStep={nextStep}
        />
      ) : step === 2 ? (
        <>
          <Programmedata
            enrollment={enrollment}
            handleSetEnrollment={handleSetEnrollment}
            nextStep={nextStep}
            errors={errors}
          />
          <div className="next-and-prev-btn">
            <button className="prev-btn" onClick={prevStep}>
              Prev
            </button>

            <button className="next-btn" onClick={nextStep}>
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          <Documentdata
            enrollment={enrollment}
            handleSetEnrollment={handleSetEnrollment}
            nextStep={nextStep}
          />

          <div className="next-and-prev-btn">
            <button className="prev-btn" onClick={prevStep}>
              Prev
            </button>
            <button className="next-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Application;
