import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deletePost } from '../../store/reducers/userPostsSlice';
import DialogLoader from '../Common/DialogLoader';
import Loader from '../Common/Loader';

interface IProps {
  id: string
}

export const PostDeleteBtn = (props: IProps) => {

  const dispatch = useAppDispatch()

  const isDeletePending = useAppSelector(state => state.userPostsReducer.isDeletePending)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(props.id))
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete
      </Button>
      {isDeletePending
        ?
        <DialogLoader open={isDeletePending} />
        :
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle textAlign={"center"}>Delete Post</DialogTitle>
          <DialogContent sx={{ maxWidth: '460px' }}>
            <DialogContentText textAlign={"center"} sx={{ mb: '10px' }}>
              Are you sure you want to delete the post
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleDelete}>Delete</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      }

    </div>
  );
}



