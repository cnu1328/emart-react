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
                {"Confirm Product Remove"}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to revmove this product from cart list?
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="secondary">No</Button>
                <Button onClick={handleConfirm} color="error">Yes</Button>
            </DialogActions>

        </Dialog>
    );
}