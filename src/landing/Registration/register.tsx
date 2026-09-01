// import TextField from "@mui/material/TextField";
import { InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";
import { registerapi } from "../../api/auth.api";
import { MoveLeft } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
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

    try {
      const response = await registerapi({
        firstname: formdata.firstname,
        lastname: formdata.lastname,
        email: formdata.email,
        password: formdata.password,
      });

      console.log("SUCCESS:", response.data);
      navigate("/auth/login");
      setMessage("Account created successfully!");
    } catch (error) {
      console.log("ERROR:", error);
      setMessage("Registration failed");
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
              <h2>Create an Account</h2>
              <p>for prospective students only.Takes about a minute.</p>
            </div>
            <form onSubmit={handleSubmit}>
              {/* <label htmlFor="email">first name</label> */}
              <TextField
                className="inputfields"
                placeholder="first name "
                variant="outlined"
                name="firstname"
                value={formdata.firstname}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                className="inputfields"
                // label="Last Name"
                placeholder="last name "
                variant="outlined"
                name="lastname"
                value={formdata.lastname}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                className="inputfields"
                //   label="email"
                placeholder="email  "
                variant="outlined"
                name="email"
                value={formdata.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
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
                required
              />
              <button type="submit" className="Signin-btn">
                Create Account
              </button>
              {message && <p>{message}</p>}
            </form>
            <p onClick={() => navigate("/auth/login")}>
              Already have an account?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
