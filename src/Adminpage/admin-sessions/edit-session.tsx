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
import { updatesession } from "../../api/session.api";
import { updatesemester } from "../../api/semester.api";

interface Sessionprops {
  selectsession: any;
  open: boolean;
  onclose: () => void;
}

interface Addsessions {
  year: string;
  startdate: string;
  enddate: string;
}

interface Updatesemester {
  firstSemesterStartDate: string;
  firstSemesterEndDate: string;

  secondSemesterStartDate: string;
  secondSemesterEndDate: string;
  sessionId: number;
}

function EditSession({ selectsession, open, onclose }: Sessionprops) {
  const firstSemester = selectsession.semesters[0];
  const secondSemester = selectsession.semesters[1];

  const semesterstate: Updatesemester = {
    firstSemesterStartDate: firstSemester.startDate,
    firstSemesterEndDate: firstSemester.endDate,

    secondSemesterStartDate: secondSemester.startDate,
    secondSemesterEndDate: secondSemester.endDate,

    sessionId: selectsession.id,
  };
  const [semesterdata, setsemesterdata] =
    useState<Updatesemester>(semesterstate);

  const sessionusestate: Addsessions = {
    year: selectsession.year,
    startdate: selectsession.startdate,
    enddate: selectsession.enddate,
  };

  const [formdata, setformdata] = useState<Addsessions>(sessionusestate);

  const handleChange = (field: keyof Addsessions, value: string | number) => {
    console.log("FIELD:", field);
    console.log("VALUE:", value);
    setformdata({
      ...formdata,
      [field]: value,
    });
  };

  const handlesemesterchange = (
    field: keyof Updatesemester,
    value: string | number,
  ) => {
    console.log("FIELD:", field);
    console.log("VALUE:", value);
    setsemesterdata({
      ...semesterdata,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updatesession(selectsession.id, formdata);

      await updatesemester(firstSemester.id, {
        semester: firstSemester.semester,
        startDate: semesterdata.firstSemesterStartDate,
        endDate: semesterdata.firstSemesterEndDate,
        sessionId: semesterdata.sessionId,
      });

      await updatesemester(secondSemester.id, {
        semester: secondSemester.semester,
        startDate: semesterdata.secondSemesterStartDate,
        endDate: semesterdata.secondSemesterEndDate,
        sessionId: semesterdata.sessionId,
      });

      alert("Session updated successfully");
      onclose();
    } catch (error) {
      console.log("FAILED TO UPDATE SESSION:", error);
    }
  };
  return (
    <Dialog open={open} onClose={onclose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Academic Session</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Academic Session"
          value={formdata.year}
          onChange={(e) => handleChange("year", e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Session Start Date"
          type="date"
          value={formdata.startdate}
          onChange={(e) => handleChange("startdate", e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Session End Date"
          type="date"
          value={formdata.enddate}
          onChange={(e) => handleChange("enddate", e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <h3>First Semester</h3>

        <TextField
          fullWidth
          margin="normal"
          label="First Semester Start Date"
          type="date"
          value={semesterdata.firstSemesterStartDate}
          onChange={(e) =>
            handlesemesterchange("firstSemesterStartDate", e.target.value)
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="First Semester End Date"
          type="date"
          value={semesterdata.firstSemesterEndDate}
          onChange={(e) =>
            handlesemesterchange("firstSemesterEndDate", e.target.value)
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <h3>Second Semester</h3>

        <TextField
          fullWidth
          margin="normal"
          label="Second Semester Start Date"
          type="date"
          value={semesterdata.secondSemesterStartDate}
          onChange={(e) =>
            handlesemesterchange("secondSemesterStartDate", e.target.value)
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Second Semester End Date"
          type="date"
          value={semesterdata.secondSemesterEndDate}
          onChange={(e) =>
            handlesemesterchange("secondSemesterEndDate", e.target.value)
          }
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
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

export default EditSession;
