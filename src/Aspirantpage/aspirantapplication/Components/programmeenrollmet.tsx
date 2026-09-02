import { useEffect, useState } from "react";
import { getFaculties } from "../../../api/faculty.api";
import { getDepartments } from "../../../api/department.api";

interface Faculty {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;

  faculty: {
    id: number;
    name: string;
  };
}

interface ProgrammeDetailsProps {
  enrollment: any;
  handleSetEnrollment: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
}

function Programmedetails({
  enrollment,
  handleSetEnrollment,
  // nextStep,
}: ProgrammeDetailsProps) {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await getFaculties();
      setFaculties(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className="personal-details">
          <div className="personaldetails-body">
            <p className="section-label">Programme Details</p>
            <form>
              <div className="form-row">
                <div className="input-group">
                  <label>Faculty*</label>

                  <select
                    name="facultyId"
                    value={enrollment.facultyId}
                    onChange={handleSetEnrollment}
                    required
                  >
                    <option value="">Select Faculty</option>
                    {faculties &&
                      faculties?.map((faculty) => (
                        <option key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Department*</label>

                  <select
                    name="departmentId"
                    value={enrollment.departmentId}
                    onChange={handleSetEnrollment}
                    required
                  >
                    <option value="">Select Department*</option>

                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>JAMB Registration Number*</label>

                  <input
                    name="jambRegistrationNumber"
                    value={enrollment.jambRegistrationNumber}
                    onChange={handleSetEnrollment}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>JAMB Score*</label>

                  <input
                    type="number"
                    name="jambScore"
                    value={enrollment.jambScore}
                    onChange={handleSetEnrollment}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>WAEC Aggregate*</label>

                  <input
                    type="number"
                    name="waecAggregate"
                    value={enrollment.waecAggregate}
                    onChange={handleSetEnrollment}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Programmedetails;
