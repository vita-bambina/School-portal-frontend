import { useState } from "react";
import { deleteDepartment } from "../../api/department.api";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

interface DeleteDepartmentProps {
  id: number;
  fetchDepartments: () => Promise<void>;
  removeDepartment: (id: number) => void;
}

function DeleteDepartment({
  id,
  fetchDepartments,
  removeDepartment,
}: DeleteDepartmentProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    removeDepartment(id);

    try {
      const deleted = await deleteDepartment(id);

      if (deleted) {
        console.log("Department Deleted");

        await fetchDepartments();

        setOpen(false);
      } else {
        await fetchDepartments();
      }
    } catch (error) {
      console.log(error);

      await fetchDepartments();
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
          marginTop: "-4px"
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
        <DialogTitle>Delete Department</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this department? This action cannot
            be undone.
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

export default DeleteDepartment;
