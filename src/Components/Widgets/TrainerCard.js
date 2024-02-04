import React from 'react'
import {Heading,  Avatar,Box,Flex,Text,Stack,useColorModeValue, Badge, ScaleFade, SlideFade } from "@chakra-ui/react";
import EditButton from './TrainerEditButton';
import { EmailIcon, InfoIcon, PhoneIcon } from '@chakra-ui/icons';

const TrainerCard = (props) => {
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
            src=
                {props.img}

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
              {"Welcome " + props.name + "!"}
            </Heading>
            </SlideFade>
            
            <Badge rounded={"2xl"} p={2} fontSize={"md"} color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')} variant='outline' >@{props.trainerid}</Badge>
          </Stack>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'sm'} fontWeight={200} fontFamily={'body'} >
              <EmailIcon/> {props.email}
            </Heading>
            <Text mt = {2}  fontSize={'sm'} fontWeight={200} fontFamily={'body'}>
              <InfoIcon /> {props.specialization}
              </Text>
            <Text mt = {2}  mb={5} fontSize={'sm'} fontWeight={200} fontFamily={'body'}>
              <PhoneIcon /> 91 9805170026
              </Text>
          <EditButton id = {props.id}
                  name = {props.name}
                  email = {props.email}
                  img = {props.img}
                  trainerid = {props.trainerid}
                  specialization = {props.specialization}
                  refreshData={props.refreshData}
          />
          </Stack>

        </Box>
      </Box>
    </>
  )
}

export default TrainerCard