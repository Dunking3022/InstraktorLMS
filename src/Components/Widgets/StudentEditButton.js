import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const StudentEditButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [curUserData, setCurUserData] = useState({});

  useEffect(() => {
    setCurUserData({
      studentid: props.studentid,
      img: props.img,
      name: props.name,
      email: props.email,
      group: props.group,
      username: props.username,
    });
  }, [props]);
  const handleChange = (event, optionToUpdate) => {
    const { value } = event.target;
    setCurUserData({ ...curUserData, [optionToUpdate]: value });
  };
  const handleClick = () => {
    setIsLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .post(`https://instraktor-be-v2.vercel.app/post/update-data`, curUserData, { method: 'POST', withCredentials: true })
      .then((response) => {
        console.log(response);
        toast({
          title: "Account info updated.",
          description: "Your account information has successfully been updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        props.refreshData();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error encountered.",
          description: `There was an error updating the account. Please try again. \n\n(${error.response.data})`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <>
      <Button
        leftIcon={<EditIcon />}
        colorScheme="yellow"
        variant="outline"
        width={"7.4rem"}
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Student ID</FormLabel>
              <Input
                value={curUserData.studentid}
                onChange={(event) => handleChange(event, "studentid")}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                value={curUserData.username}
                onChange={(event) => handleChange(event, "username")}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Full Name</FormLabel>
              <Input
                ref={initialRef}
                value={curUserData.name}
                onChange={(event) => handleChange(event, "name")}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={curUserData.email}
                onChange={(event) => handleChange(event, "email")}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Group</FormLabel>
              <Input
                value={curUserData.group}
                onChange={(event) => handleChange(event, "group")}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                value={curUserData.img}
                onChange={(event) => handleChange(event, "img")}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter mt={-4}>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              {isLoading ? <Spinner /> : "Save"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudentEditButton;
