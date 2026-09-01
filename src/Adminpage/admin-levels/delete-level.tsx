import { useState } from "react";
import { deleteLevel } from "../../api/level.api.";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

interface DeleteLevelProps {
  id: number;
  fetchLevels: () => Promise<void>;
}

function Deletelevel({ id, fetchLevels }: DeleteLevelProps) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      
      await deleteLevel(id);

     
      await fetchLevels();

     
      setOpen(false);
    } catch (error) {
      console.log(error);
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
        <DialogTitle>Delete Level</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this level? This action cannot be
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

export default Deletelevel;
