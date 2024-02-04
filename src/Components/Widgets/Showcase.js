import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  StackItem,
  TagRightIcon,
  VStack,
} from "@chakra-ui/react";
import showcase01 from "../../img/showcase/showcase-01.png";
import showcase02 from "../../img/showcase/showcase-02.png";
import showcase03 from "../../img/showcase/showcase-03.png";
import showcase04 from "../../img/showcase/showcase-04.png";
import showcase05 from "../../img/showcase/showcase-05.png";
import showcase06 from "../../img/showcase/showcase-06.png";
import showcase07 from "../../img/showcase/showcase-07.png";
import showcase08 from "../../img/showcase/showcase-08.png";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const Showcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    showcase01,
    showcase02,
    showcase03,
    showcase04,
    showcase05,
    showcase06,
    showcase07,
    showcase08,
  ];

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.75;
      const headingElement = document.getElementById("showcase-heading");

      if (headingElement && !isVisible) {
        const rect = headingElement.getBoundingClientRect();
        const isHeadingVisible =
          rect.top <= threshold && rect.bottom >= threshold;

        if (isHeadingVisible) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.5s, transform 0.5s",
  };

  return (
    <Flex
      width="100vw"
      height="120vh"
      bgGradient="linear(to-tr, gray.700, gray.900)"
      alignContent="center"
      justifyContent="center"
    >
      <VStack>
        <StackItem>
          <Heading
            id="showcase-heading"
            textAlign="center"
            style={animationStyle}
            color={'white'}
          >
            🔓 Unlock the power of seamless education with Instraktor, your
            all-in-one Learning Management System. 🚀
          </Heading>
        </StackItem>
        {/* Image Carousel */}
        <StackItem>
          <Center>
            <Image
              width={"70%"}
              marginY={10}
              src={images[currentImage]}
              boxShadow={"dark-lg"}
            />
          </Center>
        </StackItem>
        {/* Optional: Add navigation buttons */}
        <Box marginBottom={20}>
          <Center>
            <Button onClick={prevImage} marginX={10}><ArrowBackIcon /></Button>
            <Button onClick={nextImage} marginX={10}><ArrowForwardIcon></ArrowForwardIcon></Button>
          </Center>
        </Box>
      </VStack>
    </Flex>
  );
};

export default Showcase;
