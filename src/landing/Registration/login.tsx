import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./registration.css";
import { login } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

function Loginpage() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("LOGIN DATA:", formdata);

    try {
      const response = await login({
        email: formdata.email,
        password: formdata.password,
      });

      console.log("LOGIN RESPONSE:", response);

      const role = response.data.user.role;

      console.log("USER:", response.data.user);

      if (role === "School_Admin") {
        navigate("/admin");
      } else if (role === "Aspirant") {
        navigate("/aspirant");
      } else if (role === "Lecturer") {
        navigate("/lecturer");
      } else if (role === "Student") {
        navigate("/student");
      }
    } catch (error: any) {
      console.log("LOGIN ERROR:", error);
      console.log("SERVER RESPONSE:", error.response?.data);
      
    }
  };

  return (
    <>
      <div className="arrow-styling">
        <button onClick={() => navigate("/")}>
          <MoveLeft />
        </button>
      </div>

      <div className="registrationBoard">
        <div className="registrationBox">
          <div className="registrationContent">
            <div className="content-header">
              <h2>Sign in </h2>
              <p>One login for student, lecturers, applicants and staff</p>
            </div>

            <form onSubmit={handleSubmit}>
              <TextField
                className="inputfields"
                //   label="email"
                placeholder="email "
                variant="outlined"
                name="email"
                value={formdata.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <TextField
                className="inputfields"
                //   label="Password"
                placeholder="password "
                variant="outlined"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <button type="submit" className="Signin-btn">
                Sign in
              </button>
            </form>
            <div className="forgot-credentials">
              <p onClick={() => navigate("/auth/register")}>
                Create an Account{" "}
              </p>
              <p>forget password </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loginpage;
