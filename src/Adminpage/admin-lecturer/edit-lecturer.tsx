import { useState, useEffect } from "react";
import { updatelecturer } from "../../api/lecturer.api";
import { getFaculties } from "../../api/faculty.api";
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

interface Editlecturerprops {
  selectlecturer: any;
  open: boolean;
  onclose: () => void;
}

interface faculty {
  id: number;
  name: string;
}

interface EditLecturerSignin {
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  facultyId: number;
}
function Editlecturer({ selectlecturer, open, onclose }: Editlecturerprops) {
  const lecturerusestate: EditLecturerSignin = {
    title: selectlecturer.title,
    firstname: selectlecturer.user.firstname,
    lastname: selectlecturer.user.lastname,
    email: selectlecturer.user.email,
    password: "",
    facultyId: selectlecturer.facultyId,
  };
  const [formdata, setformdata] =
    useState<EditLecturerSignin>(lecturerusestate);
  const [selectfaculty, setselectfaculty] = useState<faculty[]>([]);

  const handleChange = (
    field: keyof EditLecturerSignin,
    value: string | number,
  ) => {
    console.log("FIELD:", field);
    console.log("VALUE:", value);
    setformdata({
      ...formdata,
      [field]: value,
    });
  };

  useEffect(() => {
    const fetchfaculties = async () => {
      try {
        const response = await getFaculties();
        setselectfaculty(response.data);
      } catch (error) {
        console.error("Failed to fetch faculties", error);
      }
    };

    fetchfaculties();
  }, []);
  const handleSubmit = async () => {
    try {
      const updateData = {
        title: formdata.title,
        firstname: formdata.firstname,
        lastname: formdata.lastname,
        email: formdata.email,
        facultyId: Number(formdata.facultyId),

        ...(formdata.password !== "" && {
          password: formdata.password,
        }),
      };

      console.log("UPDATE DATA:", updateData);

      const response = await updatelecturer(selectlecturer.id, updateData);

      console.log("UPDATE RESPONSE:", response.data);

      alert("Lecturer updated successfully");

      onclose();
    } catch (error) {
      console.log("FAILED TO UPDATE LECTURER:", error);
    }
  };
  return (
    <Dialog open={open} onClose={onclose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Lecturer</DialogTitle>

      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Title</InputLabel>

          <Select
            value={formdata.title}
            label="Title"
            onChange={(e) => handleChange("title", e.target.value)}
          >
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Mrs">Mrs</MenuItem>
            <MenuItem value="Miss">Miss</MenuItem>
            <MenuItem value="Dr">Dr</MenuItem>
            <MenuItem value="Prof">Prof</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          value={formdata.firstname}
          onChange={(e) => handleChange("firstname", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          value={formdata.lastname}
          onChange={(e) => handleChange("lastname", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={formdata.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          type="password"
          value={formdata.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Faculty</InputLabel>

          <Select
            value={formdata.facultyId}
            label="Faculty"
            onChange={(e) => handleChange("facultyId", Number(e.target.value))}
          >
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

        <Button variant="contained" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Editlecturer;
