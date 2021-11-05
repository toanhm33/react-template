import { Box, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import StatisticItem from './components/StatisticItem';
import StudentRanking from './components/StudentRanking';
import Widget from './components/Widget';
import { dashboardActions, selectDashBoardLoading, selectDashBoardStatistics, selectHightestStudentList, selectLowestStudentList, selectRankingByCityList } from './dashboardSlice';

export interface DashboardProps {
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1)
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%'
  },
  title: {
    fontSize: 26,
    marginTop: 30,
    color: '#3f51b5'
  },
  divider: {
    margin: '30px 0'
  }
}))

export function Dashboard (props: DashboardProps) {

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashBoardLoading);
  const statistics = useAppSelector(selectDashBoardStatistics);
  const highestStudenList = useAppSelector(selectHightestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);
  const classes = useStyles();
  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch])

  console.log('lowestStudentList', lowestStudentList);
  
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading}/>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem icon={<PeopleAlt fontSize="large" color="primary"/>} label="male" value={statistics.maleCount} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem icon={<ChatRounded fontSize="large" color="primary"/>} label="female" value={statistics.femaleCount} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem icon={<ChatBubble fontSize="large" color="primary" />} label="mark >= 8" value={statistics.highMarkCount} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem icon={<LinearScaleSharp fontSize="large" color="primary"/>} label="mark<=5" value={statistics.lowMarkCount} />
        </Grid>
      </Grid>
      <Divider className={classes.divider}/>
      {/* all student ranking */}
      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Widget title="Student with highest mark">
              <StudentRanking studentList={highestStudenList}/>
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Widget title="Student with lowest mark">
              <StudentRanking studentList={lowestStudentList}/>
            </Widget>
          </Grid>
        </Grid>
      </Box>
      <Divider className={classes.divider}/>

      {/* ranking by city */}
      <Box mt={5}>
        <Typography className={classes.title}>Ranking by city</Typography>
        <Box>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={4} xl={3}>
                <Widget title="Student with lowest mark">
                  <StudentRanking studentList={ranking.rankingList}/>
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
