import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


type AlertDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

export default function AlertDialog({
    open, handleClose, handleConfirm
}: AlertDialogProps) {  

    return(
        
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirm Delete"}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this product? This action cannot be undone.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleConfirm} color="error">Delete</Button>
            </DialogActions>

        </Dialog>
    );
}