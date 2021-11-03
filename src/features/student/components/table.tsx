import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Student } from 'models';
import { Button, DialogContentText } from '@material-ui/core';
import AlertDialog from 'components/Common/Dialog';
import studentApi from 'api/studentApi';
import { studentActions } from '../studentSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  table: {

  },
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  buttonForm: {
    width: '40%',
  },
  contentDialog: {

  }
});

export interface StudentTableProps {
  studentList: Student[];
}

export default function StudentTable({ studentList }: StudentTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch()
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList({
      _page: 1,
      _limit: 15
    }));
  }, [dispatch])
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveOpen = (student: Student) => {
    setOpen(true);
    setSelectedStudent(student);
  };
  const dialogContent = (
    <div className={classes.contentDialog}>
      Are you sure to remove student named?
    </div>
  );

  const handleRemoveConfirm = async (student: Student) => {
    try {
      await studentApi.remove(student?.id || '');
      // dispatch(studentActions.setFilter(filter));
    } catch (error) {
      console.log('failed to fetch student');
      
    }
  }
  
  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            studentList.map((student, idx) => (
              <TableRow key={student.id}>
                <TableCell>{ student.id }</TableCell>
                <TableCell>{ student.name }</TableCell>
                <TableCell>{ student.gender }</TableCell>
                <TableCell>{ student.mark }</TableCell>
                <TableCell>{ student.city }</TableCell>
                <TableCell className={classes.flexWrap} align="right">
                  <Button onClick={() => handleRemoveOpen(student)} className={classes.buttonForm} variant="contained" color="secondary">Delete</Button>
                  <Button className={classes.buttonForm} variant="contained" color="primary">Edit</Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <AlertDialog open={open} handleSubmit={() => handleRemoveConfirm(selectedStudent as Student)} handleClose={handleClose} title="Remove a Student" dialogContent={dialogContent}/>
    </TableContainer>
  );
}
