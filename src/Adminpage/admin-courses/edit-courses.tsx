import { useEffect, useState } from "react";
import { updatecourse } from "../../api/course.api";
import { getFaculties } from "../../api/faculty.api";
import { getDepartments } from "../../api/department.api";
import { getLevels } from "../../api/level.api.";
import { getLecturers } from "../../api/lecturer.api";
import { getSemester } from "../../api/semester.api";

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

interface EditCourseProps {
  open: boolean;
  closeModal: () => void;
  onSuccess: () => void;
  course: any;
}

interface coursestate {
  name: string;
  code: string;
  courseunit: number;
  levelId: number;
  departmentId: number;
  semesterId: number;
  lecturerIds: number[];
}

function EditCourse({ open, closeModal, onSuccess, course }: EditCourseProps) {
  const [formData, setFormData] = useState<coursestate>({
    name: "",
    code: "",
    courseunit: 0,
    levelId: 0,
    departmentId: 0,
    semesterId: 0,
    lecturerIds: [],
  });

  const [faculties, setFaculties] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [levels, setLevels] = useState<any[]>([]);
  const [lecturers, setLecturers] = useState<any[]>([]);
  const [semesters, setSemesters] = useState<any[]>([]);

  const [selectedFaculty, setSelectedFaculty] = useState(0);

  // Fetch faculties, departments, levels, lecturers and semesters
  const fetchData = async () => {
    try {
      const facultyResponse = await getFaculties();
      const departmentResponse = await getDepartments();
      const levelResponse = await getLevels();
      const lecturerResponse = await getLecturers();
      const semesterResponse = await getSemester();

      setFaculties(facultyResponse.data);
      setDepartments(departmentResponse.data);
      setLevels(levelResponse.data);
      setLecturers(lecturerResponse.data);
      setSemesters(semesterResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fill the form with the selected course
  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        code: course.code,
        courseunit: course.courseunit || 0,
        levelId: course.levelId,
        departmentId: course.departmentId,
        semesterId: course.semesterId || 0,
        lecturerIds:
          course.lecturers?.map((item: any) => item.lecturerId) || [],
      });
    }
  }, [course]);

  // Find the faculty that owns the course's department
  useEffect(() => {
    if (course && departments.length > 0) {
      const department = departments.find(
        (department) => department.id === course.departmentId,
      );

      if (department) {
        setSelectedFaculty(department.facultyId);
      }
    }
  }, [course, departments]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: unknown } },
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "departmentId" ||
        name === "levelId" ||
        name === "semesterId" ||
        name === "courseunit"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updatecourse(course.id, formData);

      onSuccess();

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredDepartments = departments.filter(
    (department) => department.facultyId === selectedFaculty,
  );

  const filteredLevels = levels.filter(
    (level) => level.departmentId === formData.departmentId,
  );

  const filteredLecturers = lecturers.filter(
    (lecturer) => lecturer.facultyId === selectedFaculty,
  );

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle>Edit Course</DialogTitle>

      <DialogContent>
        {/* Course Name */}
        <TextField
          fullWidth
          margin="normal"
          label="Course Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Course Code */}
        <TextField
          fullWidth
          margin="normal"
          label="Course Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />

        {/* Course Unit */}
        <TextField
          fullWidth
          margin="normal"
          label="Course Unit"
          name="courseunit"
          type="number"
          value={formData.courseunit}
          onChange={handleChange}
          required
        />

        {/* Faculty */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Faculty</InputLabel>

          <Select
            value={selectedFaculty}
            label="Faculty"
            onChange={(e) => {
              setSelectedFaculty(Number(e.target.value));

              setFormData({
                ...formData,
                departmentId: 0,
                levelId: 0,
              });
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

        {/* Semester */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Semester</InputLabel>

          <Select
            name="semesterId"
            value={formData.semesterId}
            label="Semester"
            onChange={handleChange}
            required
          >
            <MenuItem value={0}>Select Semester</MenuItem>

            {semesters.map((semester) => (
              <MenuItem key={semester.id} value={semester.id}>
                {semester.semester}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Department */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Department</InputLabel>

          <Select
            name="departmentId"
            value={formData.departmentId}
            label="Department"
            onChange={(e) => {
              setFormData({
                ...formData,
                departmentId: Number(e.target.value),
                levelId: 0,
              });
            }}
            required
          >
            <MenuItem value={0}>Select Department</MenuItem>

            {filteredDepartments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Lecturers */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Lecturers</InputLabel>

          <Select
            multiple
            value={formData.lecturerIds}
            label="Lecturers"
            onChange={(e) => {
              const value = e.target.value;

              setFormData({
                ...formData,
                lecturerIds:
                  typeof value === "string"
                    ? value.split(",").map(Number)
                    : value.map(Number),
              });
            }}
          >
            {filteredLecturers.map((lecturer) => (
              <MenuItem key={lecturer.id} value={lecturer.id}>
                {lecturer.user.firstname} {lecturer.user.lastname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Level */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Level</InputLabel>

          <Select
            name="levelId"
            value={formData.levelId}
            label="Level"
            onChange={handleChange}
            required
          >
            <MenuItem value={0}>Select Level</MenuItem>

            {filteredLevels.map((level) => (
              <MenuItem key={level.id} value={level.id}>
                {level.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Update Course
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCourse;
