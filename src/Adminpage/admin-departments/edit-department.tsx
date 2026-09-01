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
import { useState } from "react";
import { updatedepartment } from "../../api/department.api";
import { getFaculties } from "../../api/faculty.api";
import { useEffect } from "react";

interface EditDepartmentProps {
  selectdepartment: any;
  closeModal: () => void;
  refreshDepartments: () => void;
}

interface EditDepartmentstate {
  name: string;
  facultyId: number;
  code: string;
  minimumWaecAggregate: number;
  jambCutOff: number;
}

function Editdepartment({
  selectdepartment,
  closeModal,
  refreshDepartments,
}: EditDepartmentProps) {
  const EditDepartment: EditDepartmentstate = {
    name: selectdepartment.name,
    facultyId: selectdepartment.facultyId,
    code: selectdepartment.code,
    minimumWaecAggregate: selectdepartment.minimumWaecAggregate,
    jambCutOff: selectdepartment.jambCutOff,
  };
  const [formdata, setformdata] = useState<EditDepartmentstate>(EditDepartment);
  const [faculties, setFaculties] = useState<any[]>([]);

  useEffect(() => {
    const fetchfaculties = async () => {
      try {
        const response = await getFaculties();
        setFaculties(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchfaculties()
  }, []);

  const handleChange = (
    field: keyof EditDepartmentstate,
    value: string | number,
  ) => {
    setformdata({
      ...formdata,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updatedepartment(selectdepartment.id, formdata);

      alert("Department updated successfully");

      refreshDepartments();
      closeModal();
    } catch (error) {
      console.log("FAILED TO UPDATE DEPARTMENT:", error);
    }
  };
  return (
    <Dialog open={true} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Edit Department</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Department Name"
          value={formdata.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Department Code"
          value={formdata.code}
          onChange={(e) => handleChange("code", e.target.value)}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="JAMB Cut Off"
          type="number"
          value={formdata.jambCutOff}
          onChange={(e) => handleChange("jambCutOff", Number(e.target.value))}
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Faculty</InputLabel>

          <Select
            value={formdata.facultyId}
            label="Faculty"
            onChange={(e) => handleChange("facultyId", Number(e.target.value))}
          >
            {faculties.map((faculty) => (
              <MenuItem key={faculty.id} value={faculty.id}>
                {faculty.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Minimum WAEC Aggregate"
          type="number"
          value={formdata.minimumWaecAggregate}
          onChange={(e) =>
            handleChange("minimumWaecAggregate", Number(e.target.value))
          }
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
export default Editdepartment;
