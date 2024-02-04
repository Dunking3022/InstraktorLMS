import { EditIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EditButton = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const toast=useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [curUserData, setCurUserData] = useState({});

    useEffect(() => {
      setCurUserData({id: props.id, trainerid: props.trainerid, name: props.name,email : props.email,specialization: props.specialization,img : props.img});
      },[props]);
    const handleChange = (event, optionToUpdate) => {
        const { value } = event.target;
        setCurUserData({ ...curUserData, [optionToUpdate]: value });
      };
    const handleClick = () => {
    setIsLoading(true);
    axios.put("https://instraktor-be.vercel.app/users",null,{params: curUserData
    })
    .then((response) => {
        console.log(response);
            toast({
                title: 'Account info updated.',
                description: "Your account information has successfully been updated",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            
            props.refreshData(curUserData.trainerid); 
        })
        .catch(error => {
            console.log(error);
            toast({
                title: 'Error encountered.',
                description: `There was an error creating the account. Please try again. \n\n(${error.response.data})`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            })
        .finally(() => {
            setIsLoading(false); 
        })
        // else{

        // }
    };


  return (
  <>
    <Button leftIcon={<EditIcon />} colorScheme='yellow' variant='outline' width={'7.4rem'} onClick={onOpen}>
                    Edit
    </Button>
    <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

          <FormControl >
              <FormLabel>Trainer ID</FormLabel>
              <Input value={curUserData.trainerid}
              onChange={(event) => handleChange(event, "trainerid")}
              
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Full Name</FormLabel>
              <Input ref={initialRef}  
              value={curUserData.name}
              onChange={(event) => handleChange(event, "name")}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input value={curUserData.email} 
              onChange={(event) => handleChange(event, "email")}
              
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Specialization</FormLabel>
              <Input value={curUserData.specialization}
              onChange={(event) => handleChange(event, "specialization")}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input  value={curUserData.img} 
              onChange={(event) => handleChange(event, "img")}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter mt={-4}>
            <Button colorScheme='blue' mr={3} onClick={handleClick}>
                {isLoading ? <Spinner /> : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </>
  )
}

export default EditButton