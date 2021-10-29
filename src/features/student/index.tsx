import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import studentApi from 'api/studentApi';
import DataTable from './table';

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

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: 'center',
    marginBottom: 20
  }
}));
export const  Student:React.FC  = () => {
  const classes = useStyles();
  const [listUser, setListUser] = useState<any>();
  const getUser = async () => {
    const res = await studentApi.getAll()
    setListUser(res.data)
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div>
      <Box component="span">
        <Typography className={classes.textCenter}>List student</Typography>
        {/* {itemRender()} */}
        <DataTable name={listUser}/>
      </Box>
    </div>
  );
}
