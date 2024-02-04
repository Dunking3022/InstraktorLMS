import {EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Field, Formik, useFormik } from "formik";

const AssignClass = ({ refreshData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
;

  const formik = useFormik({
    initialValues: {
      trainerid: "",
      groupid: "",
      lecture: 1,
    },
    onSubmit: (values) => {
      setIsLoading(true);
      console.log(values);
    axios
      .post("https://instraktor-be.vercel.app/classes", null, {
        params: values,
      })
      .then((response) => {
        console.log(response);
        toast({
          title: "Lecture Assigned.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error encountered.",
          description: `There was an error creating the account. Please try again. (${error.response.data})`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
        refreshData();
      });
    },
  });

  return (
    <>
      <Button
        leftIcon={<EditIcon />}
        colorScheme="twitter"
        variant="solid"
        onClick={onOpen}
      >
        Assign    
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        h={'full'}
      >
        <DrawerOverlay />
        <DrawerContent overflow={'scroll'} >
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" >Assign Class</DrawerHeader>
          <Formik>
          <form onSubmit={formik.handleSubmit}>
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="username">TrainerID</FormLabel>
                  <Field
                    required
                    as={Input}
                    ref={firstField}
                    value={formik.values.trainerid}
                    onChange={formik.handleChange}
                    type="number"
                    id="trainerid"
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="groupid">Group ID</FormLabel>
                  <InputGroup>
                  <InputLeftAddon>G</InputLeftAddon>
                  <Field
                    as={Input}
                    required
                    id="groupid"
                    type="text"
                    value={formik.values.groupid}
                    onChange={formik.handleChange}
                  />
                  </InputGroup>
                </Box>

                <Box>
                  <FormLabel htmlFor="groupid">Lecture</FormLabel>
                  <InputGroup>
                  <InputLeftAddon>G</InputLeftAddon>
                  <Field
                    as={Select}
                    required
                    id="lecture"
                    type="number"
                    value={formik.values.lecture}
                    onChange={formik.handleChange}
                  >
                    
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                    </Field>
                  </InputGroup>
                </Box>
              </Stack>
            </DrawerBody>
            

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline"  mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                isLoading={isLoading}
                type="submit"
              >
                {isLoading ? <Spinner /> : "Click me"}
              </Button>
            </DrawerFooter>
          </form>
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AssignClass;
