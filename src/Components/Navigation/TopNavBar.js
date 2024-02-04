import React from "react";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Image,
  Slide,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'; 
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import pageLogoLight from "../../img/logo/1.png";
import pageLogoDark from "../../img/logo/3.png";

const Links = ["Home", "Faculty", "Classes", "Attendance", "Live-Lectures","Docs"];

const NavLink = (props) => {
  const { children } = props;


  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"/trainer/"+props.url}
    >
      {children}
    </Box>
  );
};

const TopNavBar = () => {
  
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const userName = JSON.parse(localStorage.getItem('userData')).name;
  const userIMG = JSON.parse(localStorage.getItem('userData')).img;
  return (
    <>
      <Slide direction='top' in={5} style={{ zIndex: 10 }}>
      <Box bg={useColorModeValue("white", "black")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}> 
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image
                boxSize={"110px"}
                fit={"contain"}
                src={colorMode === "light" ? pageLogoLight : pageLogoDark}
              />
            </Box>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link} url={"dashboard/"+link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Button onClick={toggleColorMode} m={"10px"}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                boxShadow='dark-lg'
                minW={0}
              >
                <Avatar
                  name={userName}
                  size={"sm"}
                  src={userIMG}
                  loading="lazy"
                />
              </MenuButton>
              <MenuList>
                <MenuItem isDisabled>{userName}</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => {
                  localStorage.removeItem("userData");
                  navigate("/login");
                }}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      </Slide>
    </>
  );
};

export default TopNavBar;
