import { useState } from "react";
import { createFaculty } from "../../api/faculty.api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface AddFacultyProps {
  open: boolean;
  closeModal: () => void;
  onSuccess: () => void;
}

interface FacultyState {
  name: string;
  code: string;
}

const Addfacultystate: FacultyState = {
  name: "",
  code: "",
};
function Addfaculty({ closeModal, onSuccess }: AddFacultyProps) {
  const [formData, setFormData] = useState<FacultyState>(Addfacultystate);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FacultyState, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.code) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await createFaculty(formData);

      console.log(response.data);

      alert("Faculty created successfully");

      onSuccess();
      closeModal();

      setFormData(Addfacultystate);
    } catch (error) {
      console.log("FAILED TO CREATE FACULTY:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Add Faculty</DialogTitle>

      <DialogContent>
        {/* Faculty Name */}
        <TextField
          fullWidth
          margin="normal"
          label="Faculty Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        {/* Faculty Code */}
        <TextField
          fullWidth
          margin="normal"
          label="Faculty Code"
          value={formData.code}
          onChange={(e) => handleChange("code", e.target.value)}
          required
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModal} disabled={loading}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Faculty"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Addfaculty;
