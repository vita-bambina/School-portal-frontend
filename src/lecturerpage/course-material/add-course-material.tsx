// import { createCourseMaterial } from "../../api/lecturer.api";
import { useEffect, useState } from "react";
import { getlecturercourse } from "../../api/lecturer.api";

import {
  uploadCourseMaterial,
  createCourseMaterial,
} from "../../api/coursematerial";
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
interface Addcoursematerialprops {
  open: boolean;
  closemodal: () => void;
  refreshaterial: () => void;
}

interface Addmaterialsstate {
  title: string;
  file: string;
  lecturerCourseId: number;
}

const Addmaterials: Addmaterialsstate = {
  title: "",
  file: "",
  lecturerCourseId: 0,
};
function Addcoursematerial({
  open,
  closemodal,
  refreshaterial,
}: Addcoursematerialprops) {
  const [addmaterials, setaddmaterials] =
    useState<Addmaterialsstate>(Addmaterials);
  const [lecturercourses, setlecturercourses] = useState<any[]>([]);

  const [loading, setloading] = useState(false);

  const [uploading, setuploading] = useState(false);
  const handlechange = (
    field: keyof Addmaterialsstate,
    value: string | number,
  ) => {
    setaddmaterials({
      ...addmaterials,
      [field]: value,
    });
  };

  const handleFileChange = async (file: File) => {
    try {
      setuploading(true);

      const response = await uploadCourseMaterial(file);

      console.log("CLOUDINARY RESPONSE:", response.data);

      handlechange("file", response.data.secure_url);
    } catch (error) {
      console.log("PDF UPLOAD ERROR:", error);
    } finally {
      setuploading(false);
    }
  };

  const handleSubmit = async () => {
    if (
      !addmaterials.title ||
      !addmaterials.file ||
      !addmaterials.lecturerCourseId
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setloading(true);

      await createCourseMaterial(addmaterials);

      alert("Course material added successfully");

      setaddmaterials(Addmaterials);

      refreshaterial();
      closemodal();
    } catch (error) {
      console.log("FAILED TO CREATE COURSE MATERIAL:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const fetchcourses = async () => {
      try {
        const response = await getlecturercourse();

        console.log("------lecturer----courses--------", response.data);

        setlecturercourses(response.data);
      } catch (error) {
        console.log(
          "--F--A--I--L--E--D--TO--GET--L--E--C--T--U--R--E--R--COURSES",
          error,
        );
      }
    };

    fetchcourses();
  }, []);
  return (
    <Dialog open={open} onClose={closemodal} fullWidth maxWidth="sm">
      <DialogTitle>Add Course Material</DialogTitle>

      <DialogContent>
        {/* Material Title */}
        <TextField
          fullWidth
          margin="normal"
          label="Material Title"
          value={addmaterials.title}
          onChange={(e) => handlechange("title", e.target.value)}
          required
        />

        {/* Lecturer Course */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Course</InputLabel>

          <Select
            value={addmaterials.lecturerCourseId}
            label="Select Course"
            onChange={(e) =>
              handlechange("lecturerCourseId", Number(e.target.value))
            }
          >
            <MenuItem value={0}>Select Course</MenuItem>

            {lecturercourses.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.course.code} - {item.course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* PDF Upload */}
        <Button
          variant="outlined"
          component="label"
          sx={{ marginTop: 2 }}
          disabled={uploading || loading}
        >
          {uploading ? "Uploading..." : "Select PDF"}

          <input
            type="file"
            hidden
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                handleFileChange(file);
              }
            }}
          />
        </Button>

        {/* Show uploaded PDF */}
        {addmaterials.file && <p>PDF uploaded successfully</p>}
      </DialogContent>

      <DialogActions>
        <Button onClick={closemodal} disabled={loading}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Material"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Addcoursematerial;
