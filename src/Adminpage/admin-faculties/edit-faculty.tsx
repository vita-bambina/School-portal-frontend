import { useState } from "react";
import { updateFaculty } from "../../api/faculty.api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface EditfacultyProps {
  selectfaculty: any;
  closeModal: () => void;
  refreshDepartments: () => void;
}

interface Editfacultystate {
  name: string;
  code: string;
}

function Editfaculty({
  selectfaculty,
  closeModal,
  refreshDepartments,
}: EditfacultyProps) {
  const Editfaculty: Editfacultystate = {
    name: selectfaculty.name,
    code: selectfaculty.code,
  };
  const [formdata, setformdata] = useState<Editfacultystate>(Editfaculty);

  const handleChange = (
    field: keyof Editfacultystate,
    value: string | number,
  ) => {
    console.log("FIELD:", field);
    console.log("VALUE:", value);
    setformdata({
      ...formdata,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("SELECTED FACULTY:", selectfaculty);
      console.log("FACULTY ID:", selectfaculty.id);
      console.log("FORM DATA:", formdata);

      const response = await updateFaculty(selectfaculty.id, formdata);
      console.log("UPDATE RESPONSE:", response.data);

      alert("Faculty updated successfully");

      refreshDepartments();
      closeModal();
    } catch (error) {
      console.log("Filed to update Faculty:", error);
    }
  };
  return (
    <Dialog open={true} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Edit Faculty</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Faculty Name"
          value={formdata.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Faculty Code"
          value={formdata.code}
          onChange={(e) => handleChange("code", e.target.value)}
          required
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Editfaculty;
