import {EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useState } from "react";
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
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik, useFormik } from "formik";


const RegisterUser = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
  
    const formik = useFormik({
      initialValues: {
        trainerid: "",
        name: "",
        email: "",
        specialization: "",
        img: "",
        password: ""
      },
      onSubmit: (values) => {
        setIsLoading(true);
      axios
        .post("https://instraktor-be.vercel.app/users", null, {
          params: values,
        })
        .then((response) => {
          console.log(response);
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
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
        });
      },
    });
  return (
    <div>
        <Button 
        size={'sm'}
        leftIcon={<EditIcon />}
        variant="solid"
        onClick={onOpen}
        >Sign-Up</Button>
        <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        h={'full'}
      >
        <DrawerOverlay />
        <DrawerContent overflowY={'scroll'}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add a New User</DrawerHeader>
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
                    <FormLabel htmlFor="username">Name</FormLabel>
                    <Field
                      required
                      as={Input}
                      type="text"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                </Box>

                <Box>
                  <FormLabel htmlFor="username">Email</FormLabel>
                  <Field
                    as={Input}
                    required
                    id="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    required
                    id="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="specialization">Specialization</FormLabel>
                  <Field
                    as={Input}
                    id="specialization"
                    value={formik.values.specialization}
                    onChange={formik.handleChange}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="img">Image</FormLabel>
                  <InputGroup>
                  <Field
                      as={Input}
                      type="url"
                      id="img"
                      value={formik.values.img}
                      onChange={formik.handleChange}
                      placeholder="Please enter image url"
                    />
                  </InputGroup>
                </Box>
              </Stack>
            </DrawerBody>
            

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                // onClick={handleClick}
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
    </div>
  )
}

export default RegisterUser