import { Box, Flex, List, ListItem, ListIcon, Text, useColorModeValue, Heading } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const Certifications = () => {
  const certifications = [
    'ServiceNow Certified System Administrator',
    'ServiceNow Certified Application Developer',
    'Neural Network from Scratch in TensorFlow',
    'Applied Data: Blockchain',
    'Baseline: Data, ML, AI',
    'Git + GitHub for Open Source Collaboration',
    'Google Cloud Essentials',
  ];

  return (
    <Box w={'auto'} my={10}>
      <Box w='full' px={{ base: 10, lg: 4 }} mx='auto' textAlign='center'>
        <Heading
          mb={10}
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight='bold'
          lineHeight='tight'>
          Certifications
        </Heading>
        <Flex
          justifyContent='center'
          bg={useColorModeValue('gray.100', 'gray.900')}
          rounded={'lg'}
          p={6}>
          <List spacing={3}>
            {certifications.map((cert, index) => (
              <ListItem key={index}>
                <Flex align="center">
                  <ListIcon as={CheckCircleIcon} color='green.500' />
                  <Text>{cert}</Text>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Flex>
      </Box>
    </Box>
  );
};

export default Certifications;
