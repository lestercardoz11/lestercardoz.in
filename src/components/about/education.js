import { Box, Flex, Stack } from '@chakra-ui/react';
import {
  Text,
  useColorModeValue,
  Heading,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const Feature = ({ name, years, degree, children }) => {
  return (
    <Flex
      align='center'
      bg={useColorModeValue('gray.100', 'gray.900')}
      rounded={'lg'}
      p={6}
      mb={10}>
      <Stack>
        <Flex
          justifyContent='space-between'
          flexDirection={['column', 'row', 'row']}>
          <Flex flexDirection='column'>
            <Heading size='md' fontWeight='bold'>
              {name}
            </Heading>
            <Text>
              {degree}
            </Text>
          </Flex>
          <Flex flexDirection='column'>
            <Text fontStyle='italic' color='gray.600' fontSize='14px'>
              {years}
            </Text>
          </Flex>
        </Flex>
        <Box color={useColorModeValue('gray.600', 'gray.100')}>{children}</Box>
      </Stack>
    </Flex>
  );
};

const Education = () => {
  return (
    <Box w={'auto'}>
      <Box w='full' px={{ base: 10, lg: 4 }} mx='auto' textAlign='center'>
        <Text
          mb={2}
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight='bold'
          lineHeight='tight'>
          Education
        </Text>
      </Box>
      <Box maxW='7xl' py='20' mx='auto'>
        <Feature
          name='Liverpool John Moores University'
          years='2023 - 2024'
          degree='Master of Science in Computer Science'>
        </Feature>
        <Feature
          name='Symbiosis Institute of Technology'
          years='2017 - 2020'
          degree='Bachelor of Technology in Computer Science & Engineering'>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Published Research: "Bearing Fault Detection Using Comparative Analysis of Random Forest, ANN, and Autoencoder Methods"
            </ListItem>
          </List>
        </Feature>
      </Box>
    </Box>
  );
};

export default Education;
