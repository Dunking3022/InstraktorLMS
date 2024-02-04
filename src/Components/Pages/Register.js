import React, { useState } from "react";
import {
  Flex,
  Input,
  Button,
  FormControl,
  Switch,
  useColorMode,
  useColorModeValue,
  ScaleFade,
  Image,
  Box,
  Text,
  Tooltip,
  useToast,
  Spinner,
  Heading,
  FormLabel,
  HStack,
  StackItem,
} from "@chakra-ui/react";
import img from "../../img/1.png";
import img2 from "../../img/2.png";
import { Field, Formik, useFormik } from "formik";
import { EditIcon, LockIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RegisterUser from "../RegisterUser";

const Register = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.900");
  const pageBackground = useColorModeValue("blackAlpha.100", "blackAlpha.900");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name:"",
      studentid: "",
      group: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post("https://instraktor-be-v2.vercel.app/pre/register", values)
        .then((response) => {
          console.log(response);
          toast({
            title: response.data.message,
            description: "Verification email sent!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: `${error.response.data.message}`,
            description: `${Object.keys(error.response.data.keyValue)}`,
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
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bg={"blackAlpha.100"}
    >
      <ScaleFade initialScale={0.1} in={5}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          bg={formBackground}
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: "gray",
              borderRadius: '24px',
            },
          }}
          p={6}
          borderRadius={8}
          height="95vh"
          width={["xs","lg"]}
          boxShadow="lg"
          overflowY={'hidden'}
        >
          <Formik>
            <form onSubmit={formik.handleSubmit}>
              <Heading mt = {4} mb={4} textAlign={"center"} fontSize={"2em"}>
                Register
              </Heading>
              
              <HStack justifyContent={"space-between"}>
                <StackItem>
                  <FormLabel>Student ID</FormLabel>
                  <Field
                as={Input}
                id="studentid"
                required
                placeholder="2110990500"
                type="Number"
                variant="filled"
                value={formik.values.studentid}
                onChange={formik.handleChange}
                mb={3}
                p={3}
              />
                </StackItem>
                <StackItem>
                <FormLabel>Group</FormLabel>
              <Field
                as={Input}
                id="group"
                required
                placeholder="22"
                type="Number"
                variant="filled"
                value={formik.values.group}
                onChange={formik.handleChange}
                mb={3}
                p={3}
              />

                </StackItem>
              </HStack>
              
              <HStack justifyContent={"space-between"}>
                <StackItem>
                <FormLabel>Full Name</FormLabel>
              <Field
                as={Input}
                id="name"
                required
                placeholder="John Doe"
                type="text"
                variant="filled"
                value={formik.values.name}
                onChange={formik.handleChange}
                mb={3}
                p={3}
              />
                </StackItem>
                <StackItem>
                <FormLabel>Username</FormLabel>
              <Field
                as={Input}
                id="username"
                required  
                placeholder="johnny1923"
                type="username"
                variant="filled"
                value={formik.values.username}
                onChange={(e) => {
                  const updatedValue = e.target.value.replace(/\s/g, '');
                  formik.handleChange('username')(updatedValue);
                }}
                mb={3}
                p={3}
              />
                </StackItem>
              </HStack>
              
              
              
              <FormLabel>Email</FormLabel>
              <Field
                as={Input}
                id="email"
                required
                placeholder="johndoe@gmail.com"
                type="email"
                variant="filled"
                value={formik.values.email}
                onChange={formik.handleChange}
                mb={3}
                p={3}
              />
              <FormLabel>Password</FormLabel>
              <Field
                as={Input}
                id="password"
                required
                placeholder="**********"
                type="password"
                variant="filled"
                value={formik.values.password}
                onChange={formik.handleChange}
                mb={3}
                p={3}
              />

              <Flex align="center" justify="center">
                <Button
                  colorScheme="teal"
                  mb={4}
                  p={3}
                  type="submit"
                  w="100%"
                  isLoading={isLoading}
                >
                  {isLoading ? <Spinner /> : "Register"}
                </Button>
              </Flex>
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                gap={10}
              >
                <Text color="fg.muted">
                  <Link to={"/login"}>
                    <Button
                      size={"sm"}
                      leftIcon={<LockIcon />}
                      variant="solid"
                    >
                      Login
                    </Button>
                  </Link>
                </Text>
                <Tooltip label="Enable Dark Mode">
                  <span>
                    {colorMode === "light" ? (
                      <MoonIcon mr={4} />
                    ) : (
                      <SunIcon mr={4} />
                    )}
                    <Switch
                      id="dark_mode"
                      colorScheme="teal"
                      size="md"
                      onChange={toggleColorMode}
                    />
                  </span>
                </Tooltip>
              </FormControl>
            </form>
          </Formik>
        </Flex>
      </ScaleFade>
    </Flex>
  );
};

export default Register;
