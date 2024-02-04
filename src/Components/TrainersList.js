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
  Tooltip,
  Collapse,
} from "@chakra-ui/react";
import AddNewUserButton from "./AddNewUserButton";
import EditButton from "./Widgets/TrainerEditButton";

const TrainersList = () => {
  const [userArr, setUserArr] = useState([]);
  const bg = useColorModeValue('gray.100', 'gray.900');
  const bg2 = useColorModeValue('gray.300', 'gray.600');

  const refreshData = () => {
    axios
      .get("https://instraktor-be.vercel.app/users")
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
    
    <Collapse in={4}>
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
            <Th color="white.200" display={["none","none","none","table-cell","table-cell"]}>Email</Th>
            <Th color="white.200" display={["none","none","none","none","table-cell"]}>Specialization</Th>
            <Th>
                  <AddNewUserButton refreshData={refreshData} />

            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {userArr.map((user) => {
            return (
              <Tr bg={bg2} key={user.id}>
                <Td display={["none","table-cell","table-cell","table-cell","table-cell","table-cell"]}>
                  <Tooltip label={user.id} >
                  <Avatar size="sm" name={user.name} src={user.img} bgColor={'white'} />
                  </Tooltip>
                </Td>
                <Td >{user.trainerid}</Td>
                <Td display={["none","none","table-cell","table-cell","table-cell"]}>{user.name}</Td>
                <Td display={["none","none","none","table-cell","table-cell"]}>
                <Link to='javascript:void(0)'
                  onClick={() => window.location = `mailto:${user.email}`}>
                  {user.email}
                  </Link>
                </Td>
                <Td  display={["none","none","none","none","table-cell"]}>{user.specialization}</Td>
                <Td>
                  <EditButton id = {user.id}
                  name = {user.name}
                  email = {user.email}
                  img = {user.img}
                  trainerid = {user.trainerid}
                  specialization = {user.specialization}
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
    </Collapse>
  );
};

export default TrainersList;
