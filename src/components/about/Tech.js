import { Box, Flex } from '@chakra-ui/layout';
import { Heading, Text } from '@chakra-ui/react';

const Tech = () => {
  return (
    <Box mx={60} my={10} w={'auto'}>
      <Flex direction='column'>
        <Heading my={5}>Technologies I've Worked with</Heading>
      </Flex>
    </Box>
  );
};

export default Tech;
