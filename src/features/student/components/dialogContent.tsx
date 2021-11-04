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
import { selectStudentFilter, selectStudentList, studentActions } from '../studentSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const useStyles = makeStyles({

});

export interface StudentTableProps {
  studentList: Student[];
}

export default function StudentTable({ studentList }: StudentTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch()
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  const filter = useAppSelector(selectStudentFilter)

  useEffect(() => {
  }, [])


  return (
    <></>
  );
}
