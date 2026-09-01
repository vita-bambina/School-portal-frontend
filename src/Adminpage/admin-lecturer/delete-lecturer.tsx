import { useState } from "react";
import { deletelecturer } from "../../api/lecturer.api";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface DeletelecturerProps {
  id: number;
  fetchlecturer: () => Promise<void>;
  removelecturer: (id: number) => void;
}

function Deletelecturer({
  id,
  fetchlecturer,
  removelecturer,
}: DeletelecturerProps) {
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
    removelecturer(id);
    try {
      const deleted = await deletelecturer(id);

      if (deleted) {
        console.log("Faculty Deleted");

        await fetchlecturer();
        setOpen(false);

        // refresh
      } else {
        console.log("Delete Failed");
      }
    } catch (error) {
      console.error(error);
      await fetchlecturer();
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
        <DialogTitle>Delete a lecturer</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this particular lecturer? This action cannot be
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

export default Deletelecturer;
