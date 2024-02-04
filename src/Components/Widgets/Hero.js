import React from "react";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
  Center,
  SlideFade,
  StackItem,
  GenericAvatarIcon,
  VStack,
  HStack,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        width={"100vw"}
        height={"100vh"}
        bgGradient='linear(to-br, gray.700, gray.900)'
        alignContent={"center"}
        justifyContent={"center"}
      >
        
        <Center>
          <Stack direction={["column", "row"]}>
            <StackItem>
            <SlideFade in={1500} offsetY="20px">
              <HStack>  
              <StackItem> <Heading fontSize={"6.5vw"} color={'white'}>Instraktor</Heading> </StackItem>
              <b><StackItem marginLeft={-4} marginTop={10} color={'white'}><Heading fontSize={"1.5vw"}>LMS</Heading></StackItem></b>
              </HStack>
            </SlideFade>
            </StackItem>
            <VStack>
            <StackItem>
              
              <SlideFade in={1500} offsetY="-30px">
                
              <Button padding={6} size={"md"} leftIcon={<GenericAvatarIcon boxSize={10} />} colorScheme='red' rounded={"2xl"} onClick={()=>{navigate("/trainer")}}><Text>Trainer</Text></Button>
              </SlideFade>
            </StackItem>
            <StackItem>
            <SlideFade in={1500} offsetY="30px">
              <Button padding={6} size={"md"} leftIcon={<GenericAvatarIcon boxSize={10} />} colorScheme='twitter' rounded={"2xl"} onClick={()=>{navigate("/student")}}><Text>Student</Text></Button>
              </SlideFade> 
            </StackItem>
            </VStack>
          </Stack>
        </Center>
      </Flex>
    </>
  );
};

export default Hero;
