import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import studentApi from 'api/studentApi';
import DataTable from './table';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { studentActions } from './studentSlice';
import Modal from '@material-ui/core/Modal';
import AlertDialog from 'components/Common/Dialog';

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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    color: '#3f51b5',
    textAlign: 'center'
  },
  buttonAction: {
    marginLeft: 20
  },
  contentDialog: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  textField: {
    width: '48%',
    marginBottom: 15
  },
  buttonWrap: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));
export const  Student:React.FC  = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      name: '',
      age: '',
      mark: '',
      city: '',
      gender: ''
    },
    touched: {},
    errors: {}
  })

  // const hasError = (field: any) => (!!(formState.touched[field] && formState.errors[field]))
  const handleChange = (event: any) => {
    event.persist()
    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true
      }
    }))
  }
  const getUser = async () => {
    const res = await studentApi.getAll();
    dispatch(studentActions.fetch({res}))
    // setListUser(res.data)
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', formState.values.name);
    formData.append('city', formState.values.city);
    formData.append('age', formState.values.age);
    formData.append('mark', formState.values.mark);
    formData.append('gender', formState.values.gender);
    await studentApi.add(formData);
  }

  const dialogContent = (
    <div className={classes.contentDialog}>
      <TextField
        className={classes.textField}
        // error={hasError('password') || hasError('email')}
        fullWidth
        label="Name"
        name="name"
        autoComplete="true"
        onChange={handleChange}
        value={formState.values.name || ''}
        variant="outlined"
        size="small"
      />
      <TextField
        className={classes.textField}
        // error={hasError('password') || hasError('email')}
        fullWidth
        label="Age"
        name="age"
        autoComplete="true"
        onChange={handleChange}
        value={formState.values.age || ''}
        variant="outlined"
        size="small"
      />
      <TextField
        className={classes.textField}
        // error={hasError('password') || hasError('email')}
        fullWidth
        label="Mark"
        name="mark"
        autoComplete="true"
        onChange={handleChange}
        value={formState.values.mark || ''}
        variant="outlined"
        size="small"
      />
      <TextField
        className={classes.textField}
        // error={hasError('password') || hasError('email')}
        fullWidth
        label="City"
        name="city"
        autoComplete="true"
        onChange={handleChange}
        value={formState.values.city || ''}
        variant="outlined"
        size="small"
      />
      <TextField
        className={classes.textField}
        // error={hasError('password') || hasError('email')}
        fullWidth
        label="Gender"
        name="gender"
        autoComplete="true"
        onChange={handleChange}
        value={formState.values.gender || ''}
        variant="outlined"
        size="small"
      />
    </div>
  );

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div>
      <Box component="span">
        <Typography className={classes.title}>List student</Typography>
        <div className={classes.buttonWrap}>
          <Button className={classes.buttonAction} onClick={handleOpen} variant="contained" color="primary">
            Add new
          </Button>
          <Button className={classes.buttonAction} onClick={handleOpen} variant="contained" color="primary">
            Edit
          </Button>
          <Button className={classes.buttonAction} onClick={handleOpen} variant="contained" color="secondary">
            Delete
          </Button>
        </div>
        <DataTable/>
      </Box>
      <AlertDialog open={open} handleSubmit={handleSubmit} handleClose={handleClose} title="Add Student" dialogContent={dialogContent}/>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         {body}
      </Modal> */}
    </div>
  );
}
