import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import * as React from 'react';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(2),
  }
}));

export default function LoginPage () {
  
  const classes = useStyles();
  const dispatch = useAppDispatch()

  const handleLoginClick = () => {
    dispatch(authActions.login({
      username: '',
      password: '',
    }))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.box}>
        <Typography>
          student manangement
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" fullWidth onClick={handleLoginClick}>
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
