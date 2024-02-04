import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { Card, CardHeader, CardBody, CardFooter, VStack, Container, Tag, HStack, AbsoluteCenter } from "@chakra-ui/react";
// import { Image,Stack,Heading,Text,Divide,ButtonGroup,Button,Divider } from "@chakra-ui/react";
import {Heading,  Avatar,Box,Center,Image,Flex,Text,Stack,Button,useColorModeValue} from "@chakra-ui/react";
import TrainerCard from "./TrainerCard";

const TrainerMap = () => {
  const [userArr, setUserArr] = useState([]);

  useEffect(() => {
    axios
      .get("https://instraktor-be.vercel.app/users")
      .then((response) => {
        console.log(response);
        setUserArr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return(
    <Center>
      <Container bg={'pink'} height="80vh" width="120vh" justifyContent="center" centerContent>
        {/* <AbsoluteCenter> */}
        <VStack align="flex-start" alignItems="center" >
        <HStack spacing={4} overflowX="auto" alignItems="center" overflow ='scroll'>
          {userArr.map((user) => {
            return(<TrainerCard name = {user.name} id = {user.id} img = {user.img} email = {user.email} />)
          }
          )}
          
        </HStack>
        </VStack>
        {/* </AbsoluteCenter> */}
      </Container>
    </Center>

  );

  // return (
  //   <div>
  //     TrainerMap
  //     {posts.toString()}
  //     {posts.map((i) => {
  //       return (
  //         <Card maxW="sm" m={'10px'}>
  //           <CardBody>
  //             <Image
  //               src={i.img}
  //               alt="Trainer Image"
  //               borderRadius="lg"
  //               boxSize={'170px'}
  //             />    
  //             <Stack mt="6" spacing="3">
  //               <Heading size="md">{i.name}</Heading>
  //               <Text>
  //                 {i.trainerid}
  //               </Text>
  //               <Text color="blue.600" fontSize="2xl">
  //                 {/* {i.trainerid} */}
  //               </Text>
  //             </Stack>
  //           </CardBody>
  //           <Divider />
  //           <CardFooter>
  //             <ButtonGroup spacing="2">
  //               <Button variant="solid" colorScheme="blue">
  //                 Buy now
  //               </Button>
  //               <Button variant="ghost" colorScheme="blue">
  //                 Add to cart
  //               </Button>
  //             </ButtonGroup>
  //           </CardFooter>
  //         </Card>
  //       );
  //     })}
  //   </div>
  // );
};

export default TrainerMap;
