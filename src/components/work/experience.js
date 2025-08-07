import { Box, Flex, Stack } from '@chakra-ui/react';
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
        <Box color={useColorModeValue('gray.600', 'gray.100')}>{children}</Box>
      </Stack>
    </Flex>
  );
};

const Experience = () => {
  return (
    <Box w={'auto'}>
      <Box w='full' px={{ base: 10, lg: 4 }} mx='auto' textAlign='center'>
        <Text
          mb={2}
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight='bold'
          lineHeight='tight'>
          Experience
        </Text>
      </Box>
      <Box maxW='7xl' py='20' mx='auto'>
        <Feature
          name='Ajackus Consultancy'
          years='September 2020 - Ongoing'
          position='Technical Lead Manager'
          type='Full time'
          place='Mumbai, India'>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Collaborate with cross-functional teams to align technical
              solutions with business needs, ensuring high client satisfaction
              and solution relevance.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Spearheaded continuous improvement initiatives, promoting best
              practices and new technologies to optimize project execution and
              outcomes.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Acted as a primary point of contact for clients, fostering strong
              relationships and effectively communicating project requirements,
              timelines, and deliverables between clients and the development
              team.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Developed and deployed full-stack web applications from the ground
              up, significantly enhancing system efficiency and user experience.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Authored robust backend solutions for API services and complex
              modules, reducing processing time by 90% and Implemented automated
              testing for both front and backend systems using GitHub Actions,
              and secured applications with AWS Amplify and AWS Cognito.
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
              Implemented and deployed a website for a non-governmental
              organization using HTML/CSS, JavaScript and Google Cloud Services.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Applied GIT to track, test and update pre-existing source code.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Managed the website on a weekly basis.
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
              Designed and implemented a multi-tier software application using
              ASP.NET, C#, HTML/CSS, jQuery, and SQL Server, demonstrating early
              proficiency in software development and design principles.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Participated in a full software development life cycle from
              scoping, analysis, design, and implementation & solutions to meet
              client needs.
            </ListItem>
          </List>
        </Feature>
      </Box>
    </Box>
  );
};

export default Experience;
