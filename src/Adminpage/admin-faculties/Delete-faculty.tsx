import { useState } from "react";
import { DeleteFaculty } from "../../api/faculty.api";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface DeleteFacultyProps {
  id: number;
  fetchFaculties: () => Promise<void>;
  removeFaculty: (id: number) => void;
}

function Deletefaculty({
  id,
  fetchFaculties,
  removeFaculty,
}: DeleteFacultyProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!loading) {
      setOpen(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    removeFaculty(id);
    try {
      const deleted = await DeleteFaculty(id);

      if (deleted) {
        console.log("Faculty Deleted");

        await fetchFaculties();
        setOpen(false);

        // refresh
      } else {
        console.log("Delete Failed");
      }
    } catch (error) {
      console.error(error);
      await fetchFaculties();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        color="error"
        variant="contained"
        size="small"
        onClick={() => setOpen(true)}
        sx={{
          padding: "6px 14px",
          fontSize: "13px",
          borderRadius: "6px",
          textTransform: "none",
          boxShadow: "none",
          minWidth: "auto",
          height: "30px",
          marginTop: "-4px",
        }}
      >
        Delete
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Faculty</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this faculty? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton
            color="error"
            variant="contained"
            loading={loading}
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Deletefaculty;
