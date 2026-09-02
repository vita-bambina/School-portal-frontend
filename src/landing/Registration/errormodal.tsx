import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
}

function ErrorModal({ open, onClose }: ErrorModalProps) {
  return (
    <>
      <div>
        <Dialog open={open}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>An error occurred, please try again.</DialogContent>

          <DialogActions>
            <Button onClick={onClose} variant="contained">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
export default ErrorModal;
