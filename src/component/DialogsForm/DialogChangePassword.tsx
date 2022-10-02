import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react'
import DialogPasswordForm from './DialogPasswordForm';

const DialogChangePassoword = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign={"center"}>Change Password</DialogTitle>
        <DialogContent sx={{maxWidth: '460px'}}>
          <DialogContentText textAlign={"center"} sx={{ mb: '10px' }}>
            Enter your current and new password
          </DialogContentText>
          <DialogPasswordForm closeHandler={handleClose}/>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form='dialog-pass'>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogChangePassoword