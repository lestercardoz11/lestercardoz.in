import { Box, Flex } from '@chakra-ui/layout';
import { Heading, Text } from '@chakra-ui/react';

const Main = () => {
  return (
    <Box mx={60} my={10} w={'auto'}>
      <Flex direction='column'>
        <Heading my={5}>Hey, I'm Lester Cardoz</Heading>
        <Text fontSize='xl'>
          I'm a software developer who specializes in building and designing
          exceptional digital experiences. I work at Ajackus as a Software
          Developer.
        </Text>
      </Flex>
    </Box>
  );
};

export default Main;
