import React from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  Switch,
  useColorMode,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Register = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"  
      >
        <Heading mb={6}>Register</Heading>
        <Input
          disabled
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          mb={3}
        />
        <Input
          disabled
          placeholder="**********"
          type="password"
          variant="filled"
          mb={6}
        />
        <Text m={2} color={'red'} fontSize={'2xs'} width={"220px"}>Only admins can create new users.</Text>
        <Button colorScheme="teal" mb={8}>
          Log In
        </Button>
        <FormControl display="flex" alignItems="center" justifyContent={"space-between"} gap={10}>
        <Text color="fg.muted">
                    <Link to={"/"}>Log In</Link>
                </Text>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Register;
