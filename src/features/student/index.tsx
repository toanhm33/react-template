import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import studentApi from 'api/studentApi';
import StudentTable from './components/table';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Modal from '@material-ui/core/Modal';
// import Pagination  from '@material-ui/core/Pagination';
import AlertDialog from 'components/Common/Dialog';
import { selectStudentFilter, selectStudentList, studentActions } from './studentSlice';

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
  const studentList = useAppSelector(selectStudentList);
  const filter = useAppSelector(selectStudentFilter)
  console.log(studentList);
  
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
  // const getUser = async () => {
  //   const res = await studentApi.getAll();
  //   dispatch(studentActions.fetch({res}))
  // }

  const handleSubmit = async () => {
    const formData = new FormData();
    // formData.append('name', formState.values.name);
    // formData.append('city', formState.values.city);
    // formData.append('age', formState.values.age);
    // formData.append('mark', formState.values.mark);
    // formData.append('gender', formState.values.gender);
    await studentApi.add(formState.values);
    const newFilter = {...filter}
    dispatch(studentActions.setFilter(newFilter));
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
    dispatch(
      studentActions.fetchStudentList({
        _page: 1,
        _limit: 1115
      })
    )
  }, [dispatch])

  return (
    <div>
      <Box component="span">
        <Typography className={classes.title}>List student</Typography>
        <div className={classes.buttonWrap}>
          <Button className={classes.buttonAction} onClick={handleOpen} variant="contained" color="primary">
            Add new
          </Button>
        </div>
        <StudentTable studentList={studentList}/>
      </Box>
      <AlertDialog open={open} handleSubmit={handleSubmit} handleClose={handleClose} title="Add Student" dialogContent={dialogContent}/>
    </div>
  );
}
