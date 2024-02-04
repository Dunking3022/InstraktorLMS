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
  Center,
  Heading,
} from "@chakra-ui/react";
import img from "../../img/1.png";
import img2 from "../../img/2.png";
import { Field, Formik, useFormik } from "formik";
import { LockIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RegisterUser from "../RegisterUser";

const Login = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.900");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      console.log(values);
      axios
        .post("https://instraktor-be-v2.vercel.app/pre/auth", values)
        .then((response) => {
          console.log(response);
          toast({
            title: "Login Successful.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          localStorage.setItem(
            "userData",
            JSON.stringify({
              id: response.data._id,
              email: response.data.email,
              name:response.data.name,
              username:response.data.username,
              studentid: response.data.studentid,
              createdAt: response.data.createdAt,
              group: response.data.group,
              img: response.data.img,
            })
          );
          document.cookie = `accessToken=${response.data.accessToken}`;
          setTimeout(() => {
            navigate("/student/dashboard");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Error encountered.",
            description: `${error.response.data}`,
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
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <ScaleFade initialScale={0.1} in={5}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          bg={formBackground}
          p={6}
          borderRadius={8}
          boxSize={"xxl"}
          width={"xs"}
          boxShadow="lg"
        >
          <Formik>
            <form onSubmit={formik.handleSubmit}>
            <Center>
              <Box boxSize="13em" mb={6} alignSelf={"center"} >
                
                <Image
                  src={colorMode === "light" ? img : img2}
                  rounded={"xl"}
                />
                
              </Box>
              </Center>
              <Heading mb={4} textAlign={"center"} fontSize={"2em"}>
                Student Portal
              </Heading>
              <Field
                as={Input}
                id="username"
                placeholder="johndoe1923"
                type="text"
                variant="filled"
                value={formik.values.username}
                onChange={formik.handleChange}
                mb={3}
                p={3}
              />
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
                  {isLoading ? <Spinner /> : "Login"}
                </Button>
              </Flex>
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                gap={10}
              >
                <Text color="fg.muted">
                  <Link to={"/student/Register"}>
                    <Button
                      size={"sm"}
                      leftIcon={<LockIcon />}
                      variant="solid"
                    >
                      Register
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

export default Login;
