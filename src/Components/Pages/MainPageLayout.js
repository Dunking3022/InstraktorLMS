import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import TopNavBar from '../Navigation/TopNavBar'
import { Routes, Route } from 'react-router-dom';
import DashBoard from './DashBoard';
import FacultyHandler from '../FacultyHandler';
import TrainerClassesList from '../TrainerClassesList';
import Documentation from '../Documentation';
import LiveClass from './LiveClass';
import LiveClassLobby from './LiveClassLobby';
import CounterTest from './CounterTest';
import AddAttendance from './AddAttendance';

const MainPageLayout = () => {
  return (
    <Grid
        h={['200vh','200vh','full','full']}
        templateRows='repeat(20, 1fr)'
        templateColumns='repeat(12, 1fr)'
        gap={1}
        bgGradient='linear(to-l, #7F7FD5 , #91EAE4)'
        >
          <GridItem rowSpan={2} colSpan={12} zIndex="20">
            <TopNavBar />
          </GridItem>
          <GridItem rowSpan={18} colSpan={12} zIndex="10">
            {/* Main Page Starts Here */}
            <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="home" element={<DashBoard />} />
                <Route path="faculty" element={<FacultyHandler />} />
                <Route path="classes" element={<TrainerClassesList />} />
                <Route path="docs" element={<Documentation />} />
                <Route path="live-lectures/:id" element={<LiveClass />} />
                <Route path="live-lectures" element={<LiveClassLobby />} />
                <Route path="attendance" element={<AddAttendance />} />
            </Routes>
          </GridItem>
    </Grid>
  )
}
export default MainPageLayout