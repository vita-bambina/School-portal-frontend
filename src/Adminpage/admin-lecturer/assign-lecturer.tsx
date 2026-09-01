import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {  createlecturer } from "../../api/lecturer.api";
import { getFaculties } from "../../api/faculty.api";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Assignlecturerprops {
  open: boolean;
  onclose: () => void;
}

interface LecturerSignin {
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  facultyId: string;
}

const lecturerusestate: LecturerSignin = {
  title: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  facultyId: "",
};

interface faculty {
  id: number;
  name: String;
}
function Assignlecturermodal({ open, onclose }: Assignlecturerprops) {
  const [selectfaculty, setselectfaculty] = useState<faculty[]>([]);

  const [lecturerstate, setlecturerstate] = useState(lecturerusestate);

  const [loading, setloading] = useState(false);

  const [showpassword, setshowpassword] = useState(false);

  // fecth faculties from backend

  const fetchfaculties = async () => {
    try {
      const response = await getFaculties();

      setselectfaculty(response.data);
    } catch (error) {
      console.error("failed to fetch faculties", error);
    }
  };
  useEffect(() => {
    fetchfaculties();
  }, []);

  //  updating of lecturer state
  const handlechange = (field: keyof LecturerSignin, value: String) => {
    setlecturerstate({
      ...lecturerstate,
      [field]: value,
    });
  };

  // creating the lecturer using handlesubmit

  const handlesubmit = async () => {
    if (
      !lecturerstate.title ||
      !lecturerstate.firstname ||
      !lecturerstate.lastname ||
      !lecturerstate.email ||
      !lecturerstate.password ||
      !lecturerstate.facultyId
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      setloading(true);
      await createlecturer({
        ...lecturerstate,
        facultyId: Number(lecturerstate.facultyId),
      });

      alert("Lecturer added successfully");
      setlecturerstate(lecturerusestate);

      onclose();
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={onclose} fullWidth maxWidth="sm">
          <DialogTitle>Add Lecturer</DialogTitle>

          <DialogContent>
            {/* Title */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Title</InputLabel>

              <Select
                value={lecturerstate.title}
                label="Title"
                onChange={(e) => handlechange("title", e.target.value)}
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Miss">Miss</MenuItem>
                <MenuItem value="Dr">Dr</MenuItem>
                <MenuItem value="Prof">Prof</MenuItem>
              </Select>
            </FormControl>

            {/* First Name */}
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              value={lecturerstate.firstname}
              onChange={(e) => handlechange("firstname", e.target.value)}
            />

            {/* Last Name */}
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              value={lecturerstate.lastname}
              onChange={(e) => handlechange("lastname", e.target.value)}
            />

            {/* Email */}
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={lecturerstate.email}
              onChange={(e) => handlechange("email", e.target.value)}
            />

            {/* Password */}
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type={showpassword ? "text" : "password"}
              value={lecturerstate.password}
              onChange={(e) => handlechange("password", e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setshowpassword(!showpassword)}
                      >
                        {showpassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Faculty */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Faculty</InputLabel>

              <Select
                value={lecturerstate.facultyId}
                label="Faculty"
                onChange={(e) => handlechange("facultyId", e.target.value)}
              >
                <MenuItem value="">Select Faculty</MenuItem>

                {selectfaculty.map((faculty) => (
                  <MenuItem key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button onClick={onclose}>Cancel</Button>

            <Button
              variant="contained"
              onClick={handlesubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Add Lecturer"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Assignlecturermodal;
