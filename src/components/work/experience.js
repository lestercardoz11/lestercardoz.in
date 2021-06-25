import { Box, Flex, Stack } from '@chakra-ui/layout';
import {
  Text,
  useColorModeValue,
  Heading,
  Badge,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const Feature = ({ name, years, position, type, place, children }) => {
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
              {position}
            </Heading>
            <Text>
              {name}, {place}
            </Text>
          </Flex>
          <Flex flexDirection='column'>
            <Text fontStyle='italic' color='gray.600' fontSize='14px'>
              {years}
            </Text>
            <Flex justifyContent={['flex-start', 'flex-end', 'flex-end']}>
              <Badge m={1} letterSpacing='wider' colorScheme='teal'>
                {type}
              </Badge>
            </Flex>
          </Flex>
        </Flex>
        <Text color={useColorModeValue('gray.600', 'gray.100')}>
          {children}
        </Text>
      </Stack>
    </Flex>
  );
};

const Experience = () => {
  return (
    <Box w={'auto'}>
      <Box>
        <Box w='full' px={[10, , 4]} mx='auto' textAlign='center'>
          <Text mb={2} fontSize='5xl' fontWeight='bold' lineHeight='tight'>
            Experience
          </Text>
        </Box>
        <Box maxW='7xl' py='20' mx='auto'>
          <Feature
            name='Ajackus Consultancy'
            years='September 2020 - Ongoing'
            position='Software Developer'
            type='Full time'
            place='Mumbai, India'>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Produce clean, well-designed code & detailed specifications.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Troubleshoot, test and maintain the core product software and
                databases to ensure strong optimization and functionality.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Contribute in all phases of the development lifecycle & follow
                industry best practices.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Develop and deploy new features to facilitate related procedures
                and tools.
              </ListItem>
            </List>
          </Feature>
          <Feature
            name='Tribus Non-Governmental Organisation'
            years='October 2019 - March 2020'
            position='Web Developer'
            type='Volunteer'
            place='Pune, India'>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Implemented and deployed a website for non-governmental
                organization using HTML/CSS, Bootstrap, JavaScript, and Google
                Cloud Services.
              </ListItem>
            </List>
          </Feature>
          <Feature
            name='IMTAC'
            years='December 2018 - June 2019'
            position='.NET Developer'
            type='Internship'
            place='Muscat, Oman'>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Designed and implemented multi-tier software using the latest
                technologies, such as ASP.NET, C#, HTML/CSS, jQuery, and SQL
                Server.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Participated in a full software development life cycle from
                scoping, analysis, design, and implementation & solutions to
                meet client needs.
              </ListItem>
            </List>
          </Feature>
        </Box>
      </Box>
    </Box>
  );
};

export default Experience;
