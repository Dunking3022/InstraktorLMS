import { EditIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EditClassButton = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast=useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [curUserData, setCurUserData] = useState({});

    useEffect(() => {
      setCurUserData({id: props.id, trainerid: props.trainerid, groupid: props.groupid, lecture: props.lecture, img : props.img});
      },[props]);
    const handleChange = (event, optionToUpdate) => {
        const { value } = event.target;
        setCurUserData({ ...curUserData, [optionToUpdate]: value });
      };
    const handleClick = () => {
    setIsLoading(true);
    axios.put("https://instraktor-be.vercel.app/classes",null,{params: curUserData
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

          <FormControl >
              <FormLabel>Group ID</FormLabel>
              <InputGroup>
              <InputLeftAddon>G</InputLeftAddon>
              <Input value={curUserData.groupid}
              onChange={(event) => handleChange(event, "groupid")}
              
              />
              </InputGroup>
            </FormControl>

            

            
          <FormControl >
              <FormLabel>Lecture</FormLabel>
              <Input value={curUserData.lecture}
              onChange={(event) => handleChange(event, "lecture")}
              
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

export default EditClassButton