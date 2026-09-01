import { useState } from "react";
import { deletecoursematerial } from "../../api/coursematerial";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

interface DeletecoursematerialProps {
  id: number;
  fetchcoursematerial: () => Promise<void>;
  removecoursematerial: (id: number) => void;
}

function Deletecoursematerial({
  id,
  fetchcoursematerial,
  removecoursematerial,
}: DeletecoursematerialProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    removecoursematerial(id);

    try {
      const deleted = await deletecoursematerial(id);

      if (deleted) {
        console.log("Course-material deleted successfully ");

        await fetchcoursematerial();

        setOpen(false);
      } else {
        await fetchcoursematerial();
      }
    } catch (error) {
      console.log(error);

      await fetchcoursematerial();
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
        <DialogTitle>Delete Course-material</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Course-materil? This action
            cannot be undone.
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

export default Deletecoursematerial;
