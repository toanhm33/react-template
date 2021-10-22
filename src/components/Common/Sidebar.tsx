import * as React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { PeopleAlt, Dashboard } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&.active > div' : {
      backgroundColor: theme.palette.action.selected,
    }
  }
})); 

export default function BasicList() {
  const classes =  useStyles();

  return (
    <div className={classes.root}>
      <List>
        <NavLink to="/admin/dashboard">
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink to="/admin/students">
          <ListItem button>
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText primary="Students" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}
