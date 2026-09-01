import { useState } from "react";
import { revokeadmission } from "../../api/enrollment.api";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

interface Revokeadmissionprops {
  id: number;
  fetchadmission: () => Promise<void>;
  removeadmission: (id: number) => void;
}

function Revokeadmission({
  id,
  fetchadmission,
  removeadmission,
}: Revokeadmissionprops) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    removeadmission(id);

    try {
      const deleted = await revokeadmission(id);

      if (deleted) {
        console.log("Admission Revoked ");

        await fetchadmission();

        setOpen(false);
      } else {
        await fetchadmission();
      }
    } catch (error) {
      console.log(error);

      await fetchadmission();
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
        Revoke
      </Button>

      <Dialog
        open={open}
        onClose={() => {
          if (!loading) {
            setOpen(false);
          }
        }}
      >
        <DialogTitle>Revoke Admission</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want Revoke this applicant admission? This action
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
            Revoke
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Revokeadmission;
