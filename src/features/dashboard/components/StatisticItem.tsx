import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
    boxShadow: "0 0px 15px rgb(63, 81, 181, 95%)"
  }
}))
export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

export default function StatisticItem ({icon, label, value}: StatisticItemProps) {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5">{value}</Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
