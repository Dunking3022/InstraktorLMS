import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DeleteButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [curUserData, setCurUserData] = useState({});

  useEffect(() => {
    setCurUserData({
      trainerid: props.trainerid,
      lecture: props.lecture
    });
  }, [props]);

  const handleClick = () => {
    setIsLoading(true);
    console.log(curUserData);
    axios
      .delete("https://instraktor-be.vercel.app/classes", { params: curUserData })
      .then((response) => {
        console.log(response);
        toast({
          title: "Assigned class deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        props.refreshData(curUserData.trainerid);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error encountered.",
          description: `There was an error deleting the class assignment. Please try again. \n\n(${error.response.data})`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
    // else{

    // }
  };

  const cancelRef = React.useRef();
  return (
    <>
      <Button
        leftIcon={<DeleteIcon />}
        colorScheme="red"
        variant="solid"
        width={"7.4rem"}
        onClick={onOpen}
      ></Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button  ref={cancelRef} onClick={onClose} >
                Cancel
              </Button>
              <Button isLoading = {isLoading} colorScheme="red" ml={3} onClick={handleClick}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
