import { useState } from "react";
import { deletesessionId } from "../../api/session.api";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

interface DeletesessioneProps {
  id: number;
  fetchsessions: () => Promise<void>;
  removesessions: (id: number) => void;
}

function Deletesession({
  id,
  fetchsessions,
  removesessions,
}: DeletesessioneProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    removesessions(id);

    try {
      const deleted = await deletesessionId(id);

      if (deleted) {
        console.log("Department Deleted");

        await fetchsessions();

        setOpen(false);
      } else {
        await fetchsessions();
      }
    } catch (error) {
      console.log(error);

      await fetchsessions();
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
        <DialogTitle>Delete Session</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Session? This action cannot be
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

export default Deletesession;
