import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import studentApi from 'api/studentApi';
import DataTable from './table';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { studentActions } from './studentSlice';
import Modal from '@material-ui/core/Modal';


// interface Student {
//   id?: string;
//   name: string;
//   age: number;
//   mark: number;
//   gender: 'male' | 'female';
//   city: string;
//   createdAt?: number;
//   updatedAt?: number;
// }
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: 'center',
    marginBottom: 20
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export const  Student:React.FC  = () => {
  const classes = useStyles();
  const [listUser, setListUser] = useState<any>();
  const dispatch = useAppDispatch()
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const getUser = async () => {
    const res = await studentApi.getAll();
    dispatch(studentActions.fetch({res}))
    // setListUser(res.data)
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );
  useEffect(() => {
    getUser();
  }, [])

  return (
    <div>
      <Box component="span">
        <Typography className={classes.textCenter}>List student</Typography>
        {/* {itemRender()} */}
        <Button onClick={handleOpen} variant="contained" color="primary">
          Add new
        </Button>
        <DataTable/>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         {body}
      </Modal>
    </div>
  );
}
