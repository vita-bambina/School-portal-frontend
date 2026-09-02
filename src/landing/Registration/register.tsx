// import TextField from "@mui/material/TextField";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";
import { registerapi } from "../../api/auth.api";
import { MoveLeft } from "lucide-react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import SignupModal from "./signupmodal";
import ErrorModal from "./errormodal";

function Register() {
  const navigate = useNavigate();
  // const [message, setMessage] = useState("");
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [loading, setloading] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    try {
      const response = await registerapi({
        firstname: formdata.firstname,
        lastname: formdata.lastname,
        email: formdata.email,
        password: formdata.password,
      });

      setSignupSuccess(true);

      console.log("SUCCESS:", response.data);
    } catch (error: any) {
      console.log("ERROR:", error);

      if (error.response?.data?.message === "Email already exists") {
        setEmailError("Email already exists");
      } else {
        setSignupError(true);
      }
    } finally {
      setloading(false);
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
                error={!!emailError}
              />
              {emailError && <p className="email-error">{emailError}</p>}

              <TextField
                className="inputfields"
                //   label="Password"
                placeholder="password "
                variant="outlined"
                name="password"
                type={showpassword ? "text" : "password"}
                value={formdata.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton
                        onClick={() => setshowpassword(!showpassword)}
                        edge="end"
                      >
                        {showpassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  },
                }}
              />
              <button type="submit" className="Signin-btn">
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            <p onClick={() => navigate("/auth/login")}>
              Already have an account?
            </p>
          </div>
        </div>
      </div>
      <SignupModal open={signupSuccess} />
      <ErrorModal open={signupError} onClose={() => setSignupError(false)} />
    </>
  );
}
export default Register;
