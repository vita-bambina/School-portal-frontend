import UploadBox from "./uploadbox";

interface DocumentdetailsProps {
  enrollment: any;
  handleSetEnrollment: (e: { target: { value: string; name: string } }) => void;
  nextStep: () => void;
}

function Documents({ enrollment, handleSetEnrollment }: DocumentdetailsProps) {
  return (
    <div className="upload-container">
      <UploadBox
        title="Passport Photograph"
        enrollment={enrollment.passportPhoto}
        handleUrl={(url: string) =>
          handleSetEnrollment({
            target: { name: "passportPhoto", value: url },
          })
        }
      />

      <UploadBox
        title="Birth Certificate"
        enrollment={enrollment.birthCertificate}
        handleUrl={(url: string) =>
          handleSetEnrollment({
            target: { name: "birthCertificate", value: url },
          })
        }
      />

      <UploadBox
        title="WAEC Result"
        enrollment={enrollment.waecResult}
        handleUrl={(url: string) =>
          handleSetEnrollment({
            target: { name: "waecResult", value: url },
          })
        }
      />

      <UploadBox
        title="JAMB Result"
        enrollment={enrollment.jambResult}
        handleUrl={(url: string) =>
          handleSetEnrollment({
            target: { name: "jambResult", value: url },
          })
        }
      />
    </div>
  );
}

export default Documents;
