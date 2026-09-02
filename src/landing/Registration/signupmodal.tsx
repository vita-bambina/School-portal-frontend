import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SignupModalProps {
  open: boolean;
}

function SignupModal({ open }: SignupModalProps) {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Dialog open={open}>
          <DialogTitle>Signup</DialogTitle>
          <DialogContent>Signup Successful</DialogContent>

          <DialogContent>Please login to continue.</DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                navigate("/auth/login");
              }}
              variant="contained"
            >
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
export default SignupModal;
