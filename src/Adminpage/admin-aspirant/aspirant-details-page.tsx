import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEnrollmentById, approveEnrollment } from "../../api/enrollment.api";
import "./admin-aspirant.css";
import Revokeadmission from "./revokeadmission";

interface DetailsState {
  id: number;
  referenceNumber: string;
  firstName: string;
  lastName: string;
  otherName: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  country: string;
  stateOfOrigin: string;
  ninNumber: string;
  lga: string;
  currentState: string;
  currentstateLGA: string;
  facultyId: number;
  departmentId: number;
  jambRegistrationNumber: string;
  jambScore: number;
  waecAggregate: number;
  passportPhoto: string;
  birthCertificate: string;
  waecResult: string;
  jambResult: string;
  status: string;
}
function AspirantDetails() {
  const [details, setdetails] = useState<DetailsState | null>(null);
  const [loading, setloading] = useState(false);

  const { id } = useParams();

  const removeadmission = (id: number) => {
    setdetails((prev) => (prev?.id === id ? null : prev));
  };

  const fetchdata = async () => {
    setloading(true);
    try {
      const response = await getEnrollmentById(Number(id));
      console.log("asirant details", response);
      setdetails(response);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleenrollment = async () => {
    if (!id) return;
    try {
      setloading(true);

      const response = await approveEnrollment(Number(id));

      console.log("APPROVED:", response);
      setdetails(response);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  if (loading) {
    return <p> Loading....</p>;
  }
  if (!details) {
    return <p>No aspirant details found.</p>;
  }

  const documents = [
    { label: "Passport Photo", url: details.passportPhoto },
    { label: "Birth Certificate", url: details.birthCertificate },
    { label: "WAEC Result", url: details.waecResult },
    { label: "JAMB Result", url: details.jambResult },
  ];
  const initials = `${details.firstName?.[0] ?? ""}${details.lastName?.[0] ?? ""}`;

  return (
    <>
      <div className="aspirant-profile-wrapper">
        <div className="aspirant-profile-card">
          <div className="profile-sidebar">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-name">
              {details.firstName} {details.lastName}
            </div>
            <div className="profile-ref">Ref: {details.referenceNumber}</div>
            <span className={`status-badge ${details.status.toLowerCase()}`}>
              {details.status}
            </span>

            <div className="profile-actions">
              {details.status === "ADMITTED" ? (
                <Revokeadmission
                  id={details.id}
                  fetchadmission={fetchdata}
                  removeadmission={removeadmission}
                />
              ) : (
                <>
                  <button className="approve-btn" onClick={handleenrollment}>
                    Approve
                  </button>
                  <button className="delete-btn">Reject</button>
                </>
              )}
            </div>
          </div>

          <div className="profile-main">
            <div className="profile-section">
              <div className="section-label">Personal details</div>
              <div className="section-row">
                <div className="row-item">
                  <span>Other name:</span> <strong>{details.otherName}</strong>
                </div>
                <div className="row-item">
                  <span>Gender:</span> <strong>{details.gender}</strong>
                </div>
                <div className="row-item">
                  <span>Date of birth:</span>{" "}
                  <strong>{details.dateOfBirth}</strong>
                </div>
                <div className="row-item">
                  <span>Phone:</span>{" "}
                  <strong className="accent">{details.phone}</strong>
                </div>
                <div className="row-item">
                  <span>NIN:</span> <strong>{details.ninNumber}</strong>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="section-label">Location</div>
              <div className="section-row">
                <div className="row-item">
                  <span>Address:</span> <strong>{details.address}</strong>
                </div>
                <div className="row-item">
                  <span>Country:</span> <strong>{details.country}</strong>
                </div>
                <div className="row-item">
                  <span>State of origin:</span>
                  <strong>{details.stateOfOrigin}</strong>
                </div>
                <div className="row-item">
                  <span>LGA:</span> <strong>{details.lga}</strong>
                </div>
                <div className="row-item">
                  <span>Current state:</span>
                  <strong>{details.currentState}</strong>
                </div>
                <div className="row-item">
                  <span>Current state LGA:</span>
                  <strong>{details.currentstateLGA}</strong>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="section-label">Programme details</div>
              <div className="section-row">
                <div className="row-item">
                  <span>Faculty ID:</span> <strong>{details.facultyId}</strong>
                </div>
                <div className="row-item">
                  <span>Department ID:</span>
                  <strong>{details.departmentId}</strong>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="section-label">JAMB / O'level details</div>
              <div className="section-row">
                <div className="row-item">
                  <span>JAMB reg no:</span>{" "}
                  <strong>{details.jambRegistrationNumber}</strong>
                </div>
                <div className="row-item">
                  <span>JAMB score:</span> <strong>{details.jambScore}</strong>
                </div>
                <div className="row-item">
                  <span>WAEC aggregate:</span>
                  <strong>{details.waecAggregate}</strong>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="section-label">Documents</div>
              <div className="documents-list">
                {documents.map((doc) => (
                  <a
                    key={doc.label}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    {doc.label} <span className="doc-arrow">›</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AspirantDetails;
