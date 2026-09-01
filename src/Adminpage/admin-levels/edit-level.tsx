import { useEffect, useState } from "react";
import { editlevel } from "../../api/level.api.";
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

interface EditlevelProps {
  selectlevel: any;
  closeModal: () => void;
  refreshDepartments: () => void;
}

interface Editlevelstate {
  name: string;
  departmentId: number;
}
interface Department {
  id: number;
  name: string;
  facultyId: number;
}
interface Faculty {
  id: number;
  name: string;
}

function Editlevel({
  selectlevel,
  closeModal,
  refreshDepartments,
}: EditlevelProps) {
  const Editlevel: Editlevelstate = {
    name: selectlevel.level,
    departmentId: selectlevel.departmentId,
  };
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [selectedFaculty, setSelectedFaculty] = useState<number>(
    selectlevel.department?.facultyId || 0,
  );
  const [formdata, setformdata] = useState<Editlevelstate>(Editlevel);

  const handleChange = (
    field: keyof Editlevelstate,
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
      console.log("SELECTED FACULTY:", selectlevel);
      console.log("FACULTY ID:", selectlevel.id);
      console.log("FORM DATA:", formdata);

      const response = await editlevel(selectlevel.id, formdata);
      console.log("UPDATE RESPONSE:", response.data);

      alert("Faculty updated successfully");

      refreshDepartments();
      closeModal();
    } catch (error) {
      console.log("Filed to update Faculty:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyResponse = await getFaculties();
        const departmentResponse = await getDepartments();

        setFaculties(facultyResponse.data);
        setDepartments(departmentResponse.data);
      } catch (error) {
        console.log("FAILED TO FETCH DATA:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Dialog open={true} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Edit Level</DialogTitle>

      <DialogContent>
        {/* Faculty */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Faculty</InputLabel>

          <Select
            value={selectedFaculty}
            label="Faculty"
            onChange={(e) => {
              const facultyId = Number(e.target.value);

              setSelectedFaculty(facultyId);

              // Reset department when faculty changes
              handleChange("departmentId", 0);
            }}
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
            value={formdata.departmentId}
            label="Department"
            onChange={(e) =>
              handleChange("departmentId", Number(e.target.value))
            }
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
          value={formdata.name}
          onChange={(e) => handleChange("name", e.target.value)}
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
export default Editlevel;
