import "../application.css";

interface PersonalDetailsProps {
  enrollment: any;
  setenrollment: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
}

function Personaldetails({
  enrollment,
  setenrollment,
  nextStep,
}: PersonalDetailsProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(enrollment);
    nextStep();
  };

  return (
    <div className="personal-details">
      <div className="personaldetails-body">
        <form onSubmit={handleSubmit}>
          <p className="section-details">Personal information</p>
          <div className="form-row">
            <div className="input-group">
              <label>First Name*</label>

              <input
                name="firstName"
                value={enrollment.firstName}
                onChange={setenrollment}
                required
              />
            </div>

            <div className="input-group">
              <label>Last Name*</label>

              <input
                name="lastName"
                value={enrollment.lastName}
                onChange={setenrollment}
                required
              />
            </div>
            <div className="input-group">
              <label>Other Name*</label>

              <input
                name="otherName"
                value={enrollment.otherName}
                onChange={setenrollment}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Gender*</label>

              <select
                name="gender"
                value={enrollment.gender}
                onChange={setenrollment}
                required
              >
                <option value="">Select Gender*</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>
              </select>
            </div>
            <div className="input-group">
              <label>Date of Birth*</label>

              <input
                type="date"
                name="dateOfBirth"
                value={enrollment.dateOfBirth}
                onChange={setenrollment}
                required
              />
            </div>
            <div className="input-group">
              <label>Phone Number*</label>

              <input
                name="phone"
                value={enrollment.phone}
                onChange={setenrollment}
                required
              />
            </div>
          </div>
          <p className="section-label">Identificaion</p>

          <div className="form-row">
            <div className="input-group">
              <label>Country*</label>

              <input
                name="country"
                value={enrollment.country}
                onChange={setenrollment}
                required
              />
            </div>

            <div className="input-group">
              <label>State Of Origin*</label>

              <input
                name="stateOfOrigin"
                value={enrollment.stateOfOrigin}
                onChange={setenrollment}
                required
              />
            </div>

            <div className="input-group">
              <label>NIN*</label>

              <input
                name="ninNumber"
                value={enrollment.ninNumber}
                onChange={setenrollment}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>LGA*</label>

              <input
                name="lga"
                value={enrollment.lga}
                onChange={setenrollment}
                required
              />
            </div>
            <div className="input-group">
              <label>Current State*</label>

              <input
                name="currentState"
                value={enrollment.currentState}
                onChange={setenrollment}
                required
              />
            </div>
            <div className="input-group">
              <label>Current State LGA*</label>

              <input
                name="currentstateLGA"
                value={enrollment.currentstateLGA}
                onChange={setenrollment}
                required
              />
            </div>
          </div>
          <p className="section-label">Adress</p>
          <div className="input-group">
            <label>Address*</label>

            <input
              name="address"
              value={enrollment.address}
              onChange={setenrollment}
              required
            />
          </div>

          <button className="continue-btn" type="submit">
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Personaldetails;
