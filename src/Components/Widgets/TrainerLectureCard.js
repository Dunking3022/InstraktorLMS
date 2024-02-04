import { Box, Card, CardBody, CardHeader,  Heading, Stack, StackDivider, Text,  useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const TrainerLectureCard = (props) => {
    const lectureTimeMap = {
        1: "4:30 PM - 5:40 PM",
        2: "5:50 PM - 7:00 PM",
        3: "7:30 PM - 9:40 PM"
    };
  return (
    <>      
        <Card bgColor={useColorModeValue('whiteAlpha.700', 'blackAlpha.700')} 
        boxShadow={'2xl'}  >
            <CardHeader>
                <Heading size='md'>Your Lectures</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                
                {
                props.userClasses.map((item) => (
                    <Box key={item.classid}>
                        <Heading size='xs' textTransform='uppercase'>
                        {lectureTimeMap[item.lecture]}
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                        G-{item.classid}
                        </Text>
                    </Box>
                    ))}
                
                </Stack>
            </CardBody>
        </Card>
    </>
  )
}

export default TrainerLectureCard