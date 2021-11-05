import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

export interface WidgetProps {
  title: string;
  children: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    boxShadow: '0 0px 15px rgb(63, 81, 181, 95%)'
  },
  title: {
    display: 'block',
    padding: '20px 20px 0',
    textAlign: 'center'
  }
}))

export default function Widget ({title, children}: WidgetProps) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="button">{title}</Typography>
      <Box>{children}</Box>
    </Paper>
  );
}
