import {
  Card,
  Center,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Attendance = () => {
  const [userAttendance, setUserAttendance] = useState({
    attendanceBySubject: [],
  });
  const tableBG = useColorModeValue("gray.300","gray.800");
  useEffect(() => {
    const fetchedUserData = JSON.parse(localStorage.getItem("userData"));
    axios
      .get(
        `https://instraktor-be-v2.vercel.app/pre/get-attendance/${fetchedUserData.studentid}`
      )
      .then((resp) => {
        console.log(resp);
        setUserAttendance({
          attendanceBySubject: resp.data.attendanceBySubject,
        });
        console.log(userAttendance);
      });
  }, []);

  return (
    <Flex bg={"whiteAlpha.400"} justifyContent={"center"} padding={"5%"}>
      <Card
        height={"100%"}
        width={"75%"}
        bgColor={useColorModeValue("whiteAlpha.700", "blackAlpha.700")}
        boxShadow={"2xl"}
        padding={"sm"}
      >
        <Tabs boxShadow={'2xl'}>
          <TabList justifyContent={"center"}>
            {userAttendance.attendanceBySubject.map((item) => {
              return <Tab key={item.subject}>{item.subject}</Tab>;
            })}
          </TabList>
          <TabPanels>
            {userAttendance.attendanceBySubject.map((item) => {
              return (
                <>
                  <TabPanel height={"60vh"} boxShadow={'2xl'}>
                    <TableContainer height={"100%"} overflowY={"auto"} boxShadow={'2xl'}>
                      <Table size="sm" >
                        <Thead>
                          <Tr bg={tableBG}  border={"2px"} >
                            <Th>Index</Th>
                            <Th>Date</Th>
                            <Th>Attendance</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {item.attendanceRecords.map((im, index) => {
                            return (
                              <Tr
                                key={im.date}
                                bg={() => {
                                    if(im.status == "PRESENT"){
                                        return "rgb(0 255 0 / 30%)"
                                    }
                                    else{
                                        return "rgb(255 0 0 / 60%)"
                                    }
                                }}
                              >
                                {" "}
                                <Td>{index}</Td>
                                <Td>{new Intl.DateTimeFormat('en-GB').format(new Date(im.date))}</Td>
                                <Td>{im.status}</Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                </>
              );
            })}
            <TabPanel>Helo</TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Flex>
  );
};

export default Attendance;
