import { useState } from "react";
import { deleteCourse } from "../../api/course.api";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

interface DeletecourseProps {
  id: number;
  fetchcourse: () => Promise<void>;
  removecourse: (id: number) => void;
}

function DeleteCourse({ id, fetchcourse, removecourse }: DeletecourseProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    removecourse(id);

    try {
      const deleted = await deleteCourse(id);

      if (deleted) {
        console.log("Department Deleted");

        await fetchcourse();

        setOpen(false);
      } else {
        await fetchcourse();
      }
    } catch (error) {
      console.log(error);

      await fetchcourse();
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

      <Dialog
        open={open}
        onClose={() => {
          if (!loading) {
            setOpen(false);
          }
        }}
      >
        <DialogTitle>Delete Course</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Course? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={() => setOpen(false)}>
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

export default DeleteCourse;
