import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { logout } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
  Showmodal: boolean;
  setshowmodal: (value: boolean) => void;
}

function Logout({ Showmodal, setshowmodal }: LogoutProps) {
  // const [Showmodal, setshowmodal] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      setloading(true);

      await logout();

      setshowmodal(false);

      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <Dialog
        open={Showmodal}
        onClose={() => {
          if (!loading) {
            setshowmodal(false);
          }
        }}
      >
        <DialogTitle> Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to logout</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={() => setshowmodal(false)}>
            Cancel
          </Button>

          <LoadingButton
            color="error"
            variant="contained"
            loading={loading}
            onClick={handlelogout}
          >
            {" "}
            Logout
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Logout;
