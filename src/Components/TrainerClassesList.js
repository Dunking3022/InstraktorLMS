import React from "react";
import { useState, useEffect } from "react";
import './tableStyle.css';
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import AssignClass from "./AssignClassButton";
import DeleteButton from "./DeleteButton";

const TrainerClassesList = () => {
  const [userArr, setUserArr] = useState([]);
  const bg = useColorModeValue('gray.100', 'gray.900');
  const bg2 = useColorModeValue('gray.300', 'gray.600');

  const refreshData = () => {
    axios
      .get("https://instraktor-be.vercel.app/classes")
      .then((response) => {
        console.log(response);
        setUserArr(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    refreshData()
  }, []);
  return (
    <Box className = "scrollCustomizer" maxH="85vh" overflowY="scroll" backdropBlur={'lg'} backgroundColor={'blackAlpha.500'} p={'0.1'} margin={'2'} rounded={'xl'} border="1px solid" borderColor="gray.700">
    <TableContainer m={"5px"} overflowX="unset" overflowY="unset" rounded='xl' >
      <Table
        variant="simple"
        colorScheme={"blackAlpha"}
        border="2px solid"
        borderColor="gray.400"
        size="lg"
      >
        <Thead position="sticky" top={-1} zIndex = "banner">
          <Tr
            d="inline-block"
            border="2px solid"
            borderColor="gray.400"
            bg={bg}
          >
            <Th display={["none","table-cell","table-cell","table-cell","table-cell","table-cell"]}></Th>
            <Th color="white.200" maxW={15}>Trainer ID</Th>
            <Th color="white.200" display={["none","none","table-cell","table-cell","table-cell"]}>Name</Th>
            <Th color="white.200" display={["none","none","none","table-cell","table-cell"]}>Class</Th>
            <Th color="white.200" display={["table-cell","table-cell","table-cell","table-cell","table-cell"]}  >Lecture</Th>
            <Th color="white.200" display={["none","none","none","none","table-cell"]}>Subject</Th>
            <Th>
                  <AssignClass refreshData={refreshData} />

            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {userArr.map((user) => {
            return (
              <Tr bg={bg2} key={user.trainerid+" : "+user.lecture}>
                <Td display={["none","table-cell","table-cell","table-cell","table-cell","table-cell"]}>
                  <Avatar size="sm" name={user.name} src={user.img} bgColor={'white'} />
                </Td>
                <Td >{user.trainerid}</Td>
                <Td display={["none","none","table-cell","table-cell","table-cell"]}>{user.name}</Td>
                <Td display={["none","none","none","table-cell","table-cell"]}>
                <Link>
                  {user.classid}
                  </Link>
                </Td>
                <Td  display={["table-cell","table-cell","table-cell","table-cell","table-cell"]}>{user.lecture}</Td>
                <Td  display={["none","none","none","none","table-cell"]}>{user.specialization}</Td>
                <Td>
                  <DeleteButton
                  trainerid = {user.trainerid}
                  lecture = {user.lecture}
                  refreshData={refreshData}
                  />
                  </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default TrainerClassesList;
