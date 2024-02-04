import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  HStack,
  Heading,
  Progress,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const StudentLectureCard = (props) => {
  const lectureTimeMap = {
    1: "4:30 PM - 5:40 PM",
    2: "5:50 PM - 7:00 PM",
    3: "7:30 PM - 9:40 PM",
  };
  return (
    <>
      <Card
        bgColor={useColorModeValue("whiteAlpha.700", "blackAlpha.700")}
        boxShadow={"2xl"}
      >
        <CardHeader>
          <Heading size="md">Your Lectures</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {props.userClasses.map((item) => (
              <Box key={item.specialization}>
                <Heading size="xs" textTransform="uppercase">
                  {lectureTimeMap[item.lecture]}
                </Heading>
                <Text pt="2" fontSize="sm">
                  {item.specialization}
                </Text>
              </Box>
            ))}

            <HStack
              alignContent={"center"}
              justifyContent={"space-evenly"}
              bgColor={"blackAlpha.200"}
              rounded={"2xl"}
              paddingTop={"1vh"}
              paddingBottom={"1vh"}
            >
              {props.userAttendance.attendanceBySubject.map((item) => (
                <Box key={item.subject}>
                  <Center>
                    <Tooltip label={item.attendancePercentage.toFixed(2) + "%"}>
                      <CircularProgress
                        size={"5vw"}
                        marginInline={"5px"}
                        value={item.attendancePercentage}
                        color={() => {
                            if(item.attendancePercentage>75){
                                return("green")
                            }
                            else if(item.attendancePercentage>50){
                                return("orange")
                            }
                            else{
                                return("red")
                            }
                        }}
                      ></CircularProgress>
                    </Tooltip>
                    <Text>{item.subject}</Text>
                  </Center>
                </Box>
              ))}
            </HStack>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default StudentLectureCard;
