import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { authActions } from '../authSlice';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(8),
    borderRadius: 35,
    boxShadow: '0 0px 15px rgb(255 105 111 / 95%)'
  },
  boxContent: {
    minWidth: '400px',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    '& input': {
      width: '300px',
      borderRadius: '35px',
      padding: '10px',
      border: '1px solid #00000061'
    },
    '& input:focus-visible': {
      outline: 'none',
    }
  }, 
  buttonLogin: {
    margin: 'auto',
    borderRadius: 35,
    width: '200px',
    background: 'linear-gradient(270deg, #D51017, #FF696F)'    
  },
  control: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    '& label': {
      marginRight: '10px',
    }
  }
}));


export default function LoginPage () {
  
  const classes = useStyles();
  const dispatch = useAppDispatch()
  const isLogging = useAppSelector(state => state.auth.logging);
  const handleLoginClick = () => {
    dispatch(authActions.login({
      username: '',
      password: '',
    }))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.box}>
        <form className={classes.boxContent}>
          <div className={classes.control}>
            <label htmlFor='userName'>User name</label><input type='email' id='userName' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label><input type='password' id='password' required/>
          </div>
          <Button className={classes.buttonLogin} variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size={20} color="primary" />}
            &nbsp; Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
