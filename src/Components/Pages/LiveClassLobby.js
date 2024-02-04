import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Button,
  Card,
  Flex,
  Heading,
  Spacer,
  Spinner,
  StackDivider,
  StackItem,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

const LiveClassLobby = ({ match }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userClasses, setUserClasses] = useState([
    { classid: "" },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedClass, setSelectedClass] = useState();

  const handleSelectChange = (event) => {
    setSelectedClass(event.target.value);
    console.log(event.target.value);
  };


  const handleClick = () =>{
    setIsLoading(true);
    axios
        .get(`https://instraktor-be-v2.vercel.app/video/create-meeting/${selectedClass}`)
        .then((res) => {
          if (res.status === 200) {
            navigate(selectedClass);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false)
        })
  }

  useEffect(() => {
    const fetchedUserData = JSON.parse(localStorage.getItem("userData"));
    setUserData(fetchedUserData);
    axios
      .get(
        `https://instraktor-be.vercel.app/classes/${fetchedUserData.trainerid}`
      )
      .then((response) => {
        setUserClasses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Flex
        id="dailyContainer"
        h="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Card
          bgColor={useColorModeValue("whiteAlpha.700", "blackAlpha.700")}
          boxShadow={"2xl"}
          width={'50%'}
          height={'50vh'}
          padding={"3vh"}
        >
          <VStack h="full" spacing={4}  alignItems="center" >
            <StackItem>
              <Heading>Meeting</Heading>
            </StackItem>
            <Spacer />
            <StackItem >
              <Select placeholder="Choose Class" align="top" onChange={handleSelectChange} value={selectedClass}>
                {userClasses.map((user) => {
                  return <option value={user.classid}>G-{user.classid}</option>;
                })}
              </Select>
            </StackItem>
            <StackItem>
            <Button
            isDisabled={selectedClass=='' || selectedClass==undefined}
                  colorScheme="teal"
                  mb={4}
                  p={3}
                  type="submit"
                  width={'100%'}
                  onClick={handleClick}
                  isLoading={isLoading}
                >
                  {isLoading ? <Spinner /> : "Start Meeting"}
                </Button>
            </StackItem>
            <StackDivider />
          </VStack>
        </Card>
      </Flex>
    </>
  );
};

export default LiveClassLobby;
