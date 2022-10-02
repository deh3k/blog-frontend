import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react'
import DialogForm from './DialogForm';

interface DialogChangeProps {
  target: string
}

export const DialogChange: React.FC<DialogChangeProps> = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Change
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign={"center"}>Change {props.target}</DialogTitle>
        <DialogContent sx={{maxWidth: '460px'}}>
          <DialogContentText textAlign={"center"} sx={{ mb: '20px' }}>
            Enter your new {props.target} and current password
          </DialogContentText>
          <DialogForm target={props.target} closeHandler={handleClose}/>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="dialog-form">Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogChange