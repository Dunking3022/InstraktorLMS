import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  StackItem,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddNewUserButton from "../AddNewUserButton";
import EditButton from "../Widgets/TrainerEditButton";

const AddAttendance = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [checkboxState, setCheckboxState] = useState({});
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const [classMembers, setClassMembers] = useState({
    students: ["No classes assigned yet!"],
  });
  const [userClasses, setUserClasses] = useState([{ classid: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedClass, setSelectedClass] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [studentRecords, setStudentRecords] = useState([]);
  const [trainerSpecialization, setTrainerSpecialization] = useState();
  const tableBG = useColorModeValue("gray.300", "gray.800");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const formatDate = (dateString) => {
    const parts = dateString.split("-");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const handleSelectChange = (event) => {
    setSelectedClass(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    console.log(studentRecords);
  }, [studentRecords]);

  useEffect(() => {
    if (!selectedClass) {
      return;
    }

    axios
      .get(`https://instraktor-be-v2.vercel.app/pre/get-students/${selectedClass}`)
      .then((resp) => {
        console.log(resp);
        setClassMembers({
          students: resp.data.students,
        });

        const formattedStudentRecords = resp.data.students.map((student) => ({
          studentId: student.studentid,
          status: "ABSENT",
        }));

        setStudentRecords(formattedStudentRecords);
      });
  }, [selectedClass]);

  useEffect(() => {
    const fetchedUserData = JSON.parse(localStorage.getItem("userData"));
    setUserData(fetchedUserData);
    setTrainerSpecialization(fetchedUserData.specialization);
    axios
      .get(
        `https://instraktor-be.vercel.app/classes/${fetchedUserData.trainerid}`
      )
      .then((response) => {
        console.log(response);
        setUserClasses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAttendanceSubmit = async () => {
    setIsLoading(true);
    const selectedDateObject = new Date(selectedDate);
    const formattedDateForBackend = `${selectedDateObject.getDate()}-${selectedDateObject.getMonth() + 1}-${selectedDateObject.getFullYear()}`;
    console.log(`Sending Date ${formattedDateForBackend}`);
    axios
      .post("https://instraktor-be-v2.vercel.app/pre/add-attendance", {
        subject: trainerSpecialization,
        date: formattedDateForBackend,
        studentRecords: studentRecords,
      })
      .then((res) => {
        console.log(res);
        toast({
          title: "Attendance Updated!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err)=>{
        toast({
          title: "Error encountered. Please verify selected date.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(()=>{
        setIsLoading(false);
        onClose();
      })
  };

  const handleCheckboxChange = (studentId) => {
    setCheckboxState((prevCheckboxState) => ({
      ...prevCheckboxState,
      [studentId]: !prevCheckboxState[studentId],
    }));

    setStudentRecords((prevStudentRecords) =>
      prevStudentRecords.map((record) => {
        if (record.studentId === studentId) {
          return {
            ...record,
            status: !checkboxState[studentId] ? "PRESENT" : "ABSENT",
          };
        }
        return record;
      })
    );
  };

  return (
    <Flex
      bg={"whiteAlpha.400"}
      justifyContent={"center"}
      padding={"2%"}
      width={"100%"}
      height={"100%"}
    >
      <Card
        height={"100%"}
        width={"95%"}
        bgColor={useColorModeValue("whiteAlpha.700", "blackAlpha.700")}
        boxShadow={"2xl"}
        padding={"xs"}
      >
        {isMobile ? (
          <VStack width={"100%"} spacing={4} alignItems={"center"}>
            <StackItem justifyContent={"center"}>
              <Heading size={"md"}>Subject</Heading>
              <Badge>{trainerSpecialization}</Badge>
            </StackItem>

            <StackItem>
              <Select
                placeholder="Choose Class"
                align="top"
                onChange={handleSelectChange}
                value={selectedClass}
              >
                {userClasses.map((user) => (
                  <option key={user.classid} value={user.classid}>
                    G-{user.classid}
                  </option>
                ))}
              </Select>
            </StackItem>

            <StackItem>
              <Input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </StackItem>
          </VStack>
        ) : (
          <HStack
            width={"100%"}
            spacing={4}
            justifyContent={"space-evenly"}
            margin={"4px"}
            marginTop={"10px"}
          >
            <StackItem justifyContent={"center"}>
              <Center>
                <Heading size={"md"}>Subject</Heading>
              </Center>
              <Badge>{trainerSpecialization}</Badge>
            </StackItem>

            <StackItem>
              <Select
                placeholder="Choose Class"
                align="top"
                onChange={handleSelectChange}
                value={selectedClass}
              >
                {userClasses.map((user) => (
                  <option key={user.classid} value={user.classid}>
                    G-{user.classid}
                  </option>
                ))}
              </Select>
            </StackItem>

            <StackItem>
              <Input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </StackItem>
          </HStack>
        )}

        <Box
          className="scrollCustomizer"
          maxH="85vh"
          overflowY="scroll"
          backdropBlur={"lg"}
          backgroundColor={"blackAlpha.500"}
          p={"0.1"}
          margin={"2"}
          rounded={"xl"}
          border="1px solid"
          borderColor="gray.700"
        >
          <TableContainer
            m={"5px"}
            overflowX="unset"
            overflowY="unset"
            rounded="xl"
          >
            <Table
              variant="simple"
              colorScheme={"blackAlpha"}
              border="2px solid"
              borderColor="gray.400"
              size="lg"
            >
              <Thead position="sticky" top={-1} zIndex="banner">
                <Tr
                  d="inline-block"
                  border="2px solid"
                  borderColor="gray.400"
                  bg={"gray.600"}
                >
                  <Th
                    display={[
                      "none",
                      "table-cell",
                      "table-cell",
                      "table-cell",
                      "table-cell",
                      "table-cell",
                    ]}
                  ></Th>
                  <Th color="white.200" maxW={15}>
                    Student ID
                  </Th>
                  <Th
                    color="white.200"
                    display={[
                      "none",
                      "none",
                      "table-cell",
                      "table-cell",
                      "table-cell",
                    ]}
                  >
                    Name
                  </Th>
                  <Th
                    color="white.200"
                    display={[
                      "none",
                      "none",
                      "none",
                      "table-cell",
                      "table-cell",
                    ]}
                  >
                    Email
                  </Th>
                  <Th>Attendance</Th>
                </Tr>
              </Thead>
              <TableCaption margin={"-1px"}>
                <Button width={"100%"} onClick={onOpen}>Submit Attendance</Button>
              </TableCaption>
              <Tbody>
                {classMembers.students.map((student) => {
                  return (
                    <Tr bg={"gray.700"} key={student._id}>
                      <Td
                        display={[
                          "none",
                          "table-cell",
                          "table-cell",
                          "table-cell",
                          "table-cell",
                          "table-cell",
                        ]}
                      >
                        <Tooltip label={student.studentid}>
                          <Avatar
                            size="sm"
                            name={student.name}
                            src={student.img}
                            bgColor={"white"}
                          />
                        </Tooltip>
                      </Td>
                      <Td>{student.studentid}</Td>
                      <Td
                        display={[
                          "none",
                          "none",
                          "table-cell",
                          "table-cell",
                          "table-cell",
                        ]}
                      >
                        {student.name}
                      </Td>
                      <Td
                        display={[
                          "none",
                          "none",
                          "none",
                          "table-cell",
                          "table-cell",
                        ]}
                      >
                        <Link to={`mailto:${student.email}`}>
                          {student.email}
                        </Link>
                      </Td>
                      <Td>
                        <Checkbox
                          id={student.studentid}
                          isChecked={checkboxState[student.studentid]}
                          onChange={() =>
                            handleCheckboxChange(student.studentid)
                          }
                        ></Checkbox>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Update Attendance?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Center>
            <Text>Are you sure you want to update the attendance for the following Date ?</Text>
            {/* <br></br> */}
            <Badge fontSize='0.9em'>{formatDate(selectedDate)}</Badge>
            </Center>
            
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="green" ml={3} onClick={handleAttendanceSubmit} isLoading={isLoading}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
};

export default AddAttendance;
