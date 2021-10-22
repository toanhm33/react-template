import { Box, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Header } from 'components/Common';
import Sidebar from 'components/Common/Sidebar';
import { Route, Switch } from 'react-router';
import { Dashboard } from 'features/dashboard';
import { Student } from 'features/student';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '300px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh'
  },
  header: {
    gridArea: 'header',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`
  },
  main: {
    gridArea: 'main',
    padding: 20
  }
}));

export function AdminLayout () {
  const classes = useStyles();
  
  return (
    <Box className={classes.root}>
      <Box className={classes.header}> 
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar/>
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard/>
          </Route>
          <Route path="/admin/students">
            <Student/>
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
