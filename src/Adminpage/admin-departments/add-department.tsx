import { useEffect, useState } from "react";
import { createDepartment } from "../../api/department.api";
import { getFaculties } from "../../api/faculty.api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./admin-departments.css";

interface AddDepartmentProps {
  closeModal: () => void;
  refreshDepartments: () => void;
}

interface Departmentstate {
  name: string;
  facultyId: number;
  code: string;
  minimumWaecAggregate: number;
  jambCutOff: number;
}

const Adddepartment: Departmentstate = {
  name: "",
  facultyId: 0,
  code: "",
  minimumWaecAggregate: 0,
  jambCutOff: 0,
};
function AddDepartment({ closeModal, refreshDepartments }: AddDepartmentProps) {
  // const [name, setName] = useState("");
  const [formData, setFormData] = useState<Departmentstate>(Adddepartment);

  const [faculties, setFaculties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFaculties = async () => {
    try {
      const response = await getFaculties();

      setFaculties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleChange = (
    field: keyof Departmentstate,
    value: string | number,
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.code ||
      !formData.facultyId ||
      !formData.minimumWaecAggregate ||
      !formData.jambCutOff
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createDepartment({
        name: formData.name,
        code: formData.code,
        facultyId: formData.facultyId,
        jambCutOff: formData.jambCutOff,
        minimumWaecAggregate: formData.minimumWaecAggregate,
      });

      alert("Department created successfully");

      refreshDepartments();
      closeModal();

      setFormData(Adddepartment);
    } catch (error) {
      console.log("FAILED TO CREATE DEPARTMENT:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={true} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Add Department</DialogTitle>

      <DialogContent>
        {/* Department Name */}
        <TextField
          fullWidth
          margin="normal"
          label="Department Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        {/* Department Code */}
        <TextField
          fullWidth
          margin="normal"
          label="Department Code"
          value={formData.code}
          onChange={(e) => handleChange("code", e.target.value)}
          required
        />

        {/* JAMB Cut Off */}
        <TextField
          fullWidth
          margin="normal"
          label="JAMB Cut Off"
          type="number"
          value={formData.jambCutOff}
          onChange={(e) => handleChange("jambCutOff", Number(e.target.value))}
          required
        />

        {/* Minimum WAEC Aggregate */}
        <TextField
          fullWidth
          margin="normal"
          label="Minimum WAEC Aggregate"
          type="number"
          value={formData.minimumWaecAggregate}
          onChange={(e) =>
            handleChange("minimumWaecAggregate", Number(e.target.value))
          }
          required
        />

        {/* Faculty */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Faculty</InputLabel>

          <Select
            value={formData.facultyId}
            label="Faculty"
            onChange={(e) => handleChange("facultyId", Number(e.target.value))}
            required
          >
            <MenuItem value={0}>Select Faculty</MenuItem>

            {faculties.map((faculty) => (
              <MenuItem key={faculty.id} value={faculty.id}>
                {faculty.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModal} disabled={loading}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Department"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDepartment;
