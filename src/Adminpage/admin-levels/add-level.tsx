import { useEffect, useState } from "react";
import { createLevel } from "../../api/level.api.";
import { getFaculties } from "../../api/faculty.api";
import { getDepartments } from "../../api/department.api";
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

interface AddLevelProps {
  closeModal: () => void;
  onSuccess: () => void;
}

interface levelstate {
  name: string;
  departmentId: number;
}

const Addlevelstate: levelstate = {
  name: "",
  departmentId: 0,
};
function Addlevel({ closeModal, onSuccess }: AddLevelProps) {
  const [formData, setFormData] = useState<levelstate>(Addlevelstate);

  const [faculties, setFaculties] = useState<any[]>([]);

  const [departments, setDepartments] = useState<any[]>([]);

  const [selectedFaculty, setSelectedFaculty] = useState(0);
  const [Loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const facultyResponse = await getFaculties();

      const departmentResponse = await getDepartments();

      setFaculties(facultyResponse.data);

      setDepartments(departmentResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (field: keyof levelstate, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.departmentId) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createLevel(formData);

      alert("Level created successfully");

      onSuccess();
      closeModal();

      setFormData(Addlevelstate);
    } catch (error) {
      console.log("FAILED TO CREATE LEVEL:", error);
    } finally {
      setLoading(false);
    }
  };

  // const filteredDepartments = departments.filter(
  //   (department) => department.facultyId === selectedFaculty,
  // );
  return (
    <Dialog open={true} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Add Level</DialogTitle>

      <DialogContent>
        {/* Faculty */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Faculty</InputLabel>

          <Select
            value={selectedFaculty}
            label="Faculty"
            onChange={(e) => {
              setSelectedFaculty(Number(e.target.value));

              // Reset department when faculty changes
              handleChange("departmentId", 0);
            }}
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

        {/* Department */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Department</InputLabel>

          <Select
            value={formData.departmentId}
            label="Department"
            onChange={(e) =>
              handleChange("departmentId", Number(e.target.value))
            }
            required
          >
            <MenuItem value={0}>Select Department</MenuItem>

            {departments
              .filter((department) => department.facultyId === selectedFaculty)
              .map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {/* Level Name */}
        <TextField
          fullWidth
          margin="normal"
          label="Level Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModal} disabled={Loading}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={Loading}>
          {Loading ? "Adding..." : "Add Level"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Addlevel;
