import React from 'react'
import {Heading,  Avatar,Box,Flex,Text,Stack,useColorModeValue, Badge, ScaleFade, SlideFade } from "@chakra-ui/react";
import EditButton from './TrainerEditButton';
import { AtSignIcon, EmailIcon, InfoIcon, PhoneIcon } from '@chakra-ui/icons';
import StudentEditButton from './StudentEditButton';

const StudentCard = (props) => {
    console.log(props);
  return (
    <>
        <Box
        minW={'35vw'} 
        bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.500')}
        alignSelf={"center"}
        justifySelf={"center"}
        boxShadow={'2xl'}
        rounded={'3xl'}
        overflow={'hidden'}
        >
        <Box
          h={'120px'}
          w={'17vw'}
          
          alt="#"
        />
        <ScaleFade in={10}> 
        <Flex justify={'center'} mt={-12}>
          <Avatar
            name={props.name} 
            size={'xl'}
            bg={useColorModeValue("blackAlpha.600","whiteAlpha.600")}
            src={props.img}
            css={{
              border: '2px hidden white',
            }}
          />
        </Flex>
        
        </ScaleFade>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={4}>
            <SlideFade direction='bottom' in={1}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'} mb={3}>
              {"Welcome " + (props.name && props.name.split(" ")[0    ] || props.name) + "!"}
            </Heading>
            </SlideFade>
            
            <Badge rounded={"2xl"} p={2} fontSize={"md"} color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')} variant='outline' >@{props.studentid}</Badge>
          </Stack>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'sm'} fontWeight={200} fontFamily={'body'} >
              <EmailIcon/> {props.email}
            </Heading>
            <Text mt = {2}  fontSize={'sm'} fontWeight={200} fontFamily={'body'}>
              <InfoIcon /> {"G-"+props.group}
              </Text>
            <Text mt = {2}  mb={5} fontSize={'sm'} fontWeight={200} fontFamily={'body'}>
              <AtSignIcon /> {props.username}
              </Text>
          <StudentEditButton id = {props.id}
                  name = {props.name}
                  username= {props.username}
                  email = {props.email}
                  studentid = {props.studentid}
                  group = {props.group}
                  refreshData={props.refreshData}
                  img = {props.img}
          />
          </Stack>

        </Box>
      </Box>
    </>
  )
}

export default StudentCard