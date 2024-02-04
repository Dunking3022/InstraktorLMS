import React, { useEffect, useState } from 'react'
import { Container, Flex, Grid, GridItem, ScaleFade } from '@chakra-ui/react'
import TrainerCard from '../Widgets/TrainerCard'
import axios from 'axios'
import TrainerLectureCard from '../Widgets/TrainerLectureCard'

const DashBoard = () => {

  const [userData,setUserData] = useState( {} );
  const [userClasses, setUserClasses] = useState([{classid: "You have no classes assigned to you yet!"}]); 
  useEffect(()=> {
    const fetchedUserData = JSON.parse(localStorage.getItem("userData"));
    setUserData(fetchedUserData);
    if (fetchedUserData && fetchedUserData.trainerid) {
      updateUserData(fetchedUserData.trainerid);
    };
    axios
      .get(`https://instraktor-be.vercel.app/classes/${fetchedUserData.trainerid}`)
      .then((response) => {
        setUserClasses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  },[])

  useEffect(() => {
    console.log(userClasses);
  },[userClasses])

  const updateUserData = (uid) => {
    axios
      .get(`https://instraktor-be.vercel.app/users/${uid}`)
      .then((response) => {
        setUserData(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });

    

  }

  return (
    <>
      <Grid 
        h={['139.5vh','139.5vh','89.5vh','89.5vh']}
        templateRows={['repeat(4, 1fr)','repeat(4, 1fr)','repeat(1, 1fr)','repeat(1, 1fr)']}
        templateColumns='repeat(12, 1fr)'
        gap={1}>
        <GridItem colSpan={[12,12,7,7]} >
          <Flex boxSize={'full'}  align={'center'} justifyContent={'center'} minHeight="200px">
          <Container justifyContent={'center'}> 
          
          <ScaleFade initialScale={0.1} in={5}>
            <TrainerLectureCard userClasses = {userClasses}/>
          </ScaleFade>
          </Container>
          </Flex>
          {/* 
          TO BE IMPLEMENTED LATER
          
          <Grid 
          h='89.5vh'
          templateRows='repeat(3, 1fr)'
          templateColumns='repeat(1, 1fr)'
          gap={2}>
            <GridItem bg={'purple'} m={1} marginTop={2} maxHeight={'90%'} overflowY={'scroll'}>
              
              1
            </GridItem>
            <GridItem bg={'lightgreen'} m={1}>
              2
            </GridItem>
            <GridItem bg={'red'} m={1}>
              3
            </GridItem>
          </Grid> */}
        </GridItem>
        <GridItem boxSize={'full'} rowSpan = {[3,3,1,1]} display={["flex","flex","flex","flex"]}  colSpan={[12,12,5,5]}  overflowY={'auto'} overflowX={'auto'} alignContent={'center'} justifyContent={'center'}>
          
          <TrainerCard trainerid = {userData.trainerid} name={userData.name} img = {userData.img} email= {userData.email} specialization = {userData.specialization} id= {userData.id} refreshData = {updateUserData}/> 
    
        </GridItem>
      </Grid>
    </>
  )
}

export default DashBoard