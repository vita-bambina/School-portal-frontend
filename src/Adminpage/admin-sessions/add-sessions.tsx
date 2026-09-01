import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { createSemester } from "../../api/semester.api";
import { CreateSession } from "../../api/session.api";

interface Sessionprops {
  open: boolean;
  onclose: () => void;
}

interface Addsessions {
  year: string;
  startdate: string;
  enddate: string;

  firstSemesterStartDate: string;
  firstSemesterEndDate: string;

  secondSemesterStartDate: string;
  secondSemesterEndDate: string;
}

const sessionusestate: Addsessions = {
  year: "",
  startdate: "",
  enddate: "",

  firstSemesterStartDate: "",
  firstSemesterEndDate: "",

  secondSemesterStartDate: "",
  secondSemesterEndDate: "",
};

function AddsessionsModal({ open, onclose }: Sessionprops) {
  const [loading, setloading] = useState(false);
  const [sessionstate, addsessionstate] = useState(sessionusestate);

  const handlechage = (field: keyof Addsessions, value: string) => {
    addsessionstate({
      ...sessionstate,
      [field]: value,
    });
  };

  const handlesubmit = async () => {
    if (
      !sessionstate.year ||
      !sessionstate.startdate ||
      !sessionstate.enddate ||
      !sessionstate.firstSemesterStartDate ||
      !sessionstate.firstSemesterEndDate ||
      !sessionstate.secondSemesterStartDate ||
      !sessionstate.secondSemesterEndDate
    ) {
      alert("please fill all fields");
      return;
    }
    try {
      setloading(true);
      const response = await CreateSession({
        year: sessionstate.year,
        startdate: sessionstate.startdate,
        enddate: sessionstate.enddate,
      });
      console.log("SESSION CREATED:", response.data);

      const sessionId = response.data.id;

      console.log("SESSION ID:", sessionId);
      await createSemester({
        semester: "first_semester",
        startDate: sessionstate.firstSemesterStartDate,
        endDate: sessionstate.firstSemesterEndDate,
        sessionId: sessionId,
      });
      await createSemester({
        semester: "second_semester",
        startDate: sessionstate.secondSemesterStartDate,
        endDate: sessionstate.secondSemesterEndDate,
        sessionId: sessionId,
      });
      alert("Session and semesters added successfully");

      addsessionstate(sessionusestate);
      onclose();
    } catch (error) {
      console.error("Failed to create session:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={onclose} fullWidth maxWidth="sm">
          <DialogTitle>Add Academic Session</DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Academic Session"
              placeholder="e.g. 2026/2027"
              value={sessionstate.year}
              onChange={(e) => handlechage("year", e.target.value)}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Session Start Date"
              type="date"
              value={sessionstate.startdate}
              onChange={(e) => handlechage("startdate", e.target.value)}
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
              value={sessionstate.enddate}
              onChange={(e) => handlechage("enddate", e.target.value)}
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
              value={sessionstate.firstSemesterStartDate}
              onChange={(e) =>
                handlechage("firstSemesterStartDate", e.target.value)
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
              value={sessionstate.firstSemesterEndDate}
              onChange={(e) =>
                handlechage("firstSemesterEndDate", e.target.value)
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
              value={sessionstate.secondSemesterStartDate}
              onChange={(e) =>
                handlechage("secondSemesterStartDate", e.target.value)
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
              value={sessionstate.secondSemesterEndDate}
              onChange={(e) =>
                handlechage("secondSemesterEndDate", e.target.value)
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

            <Button
              variant="contained"
              onClick={handlesubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Add Session"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
export default AddsessionsModal;
