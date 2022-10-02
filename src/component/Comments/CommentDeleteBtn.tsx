import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteComment } from '../../store/reducers/commentSlice';
import ClearIcon from '@mui/icons-material/Clear';

interface IProps {
  id: string
}

export const CommentDeleteBtn = (props: IProps) => {

  const dispatch = useAppDispatch()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(props.id))
    setOpen(false)
  }

  return (
    <div>
      <ClearIcon onClick={handleClickOpen} sx={{ width: '20px', color: 'error.main', '&:hover': { cursor: 'pointer' } }}/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign={"center"}>Delete comment</DialogTitle>
        <DialogContent sx={{ maxWidth: '460px' }}>
          <DialogContentText textAlign={"center"} sx={{ mb: '10px' }}>
            Are you sure you want to delete the comment
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



