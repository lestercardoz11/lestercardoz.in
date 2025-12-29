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
          name='Ajackus Consulting LLP'
          years='2020 - Ongoing'
          position='Technical Lead Manager'
          type='Full time'
          place='Mumbai, India'>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Lead 15+ developers across 20+ concurrent projects.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Serve as technical liaison between stakeholders and development teams, translating business requirements into technical specifications with 95% client satisfaction
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Collaborate with sales to develop technical solutions and business proposals, contributing to 60% growth in new contracts
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Establish technical interviewing processes and conducted 50+ technical assessments to build specialized teams across varied technology stacks
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Partner with sales to architect technical solutions for enterprise clients across various industries
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Supported pre-sales with proof-of-concept demos and technical documentation for prospective clients
            </ListItem>
          </List>
        </Feature>
        <Feature
          name='Ajackus Consulting LLP'
          years=''
          position='Senior Software Engineer'
          type='Full time'
          place='Mumbai, India'>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Managed full-stack web application (Angular, Spring, AWS, PostgreSQL) processing 10,000+ daily database transactions
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Led ServiceNow implementation projects across multiple modules, completing all deliverables on schedule
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Architected ServiceNow implementations across ITSM, ITOM, SecOps, GRC and custom application modules.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Integrated multiple environments with SSO using Azure AD, AWS Cognito, etc, reducing authentication issues by 75%
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Implemented code review protocols that reduced production defects by 25%
            </ListItem>
          </List>
        </Feature>
        <Feature
          name='Ajackus Consulting LLP'
          years=''
          position='Software Engineer'
          type='Full time'
          place='Mumbai, India'>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Co-developed Tacnique platform using Next.js, evolving prototype into product that increased revenue by 20%
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Provided technical demonstrations during client presentations
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Engineered scalable backend solutions supporting 200% user growth while maintaining performance
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Implemented automated testing pipelines, achieving 85% code coverage and reducing deployment time by 60%
            </ListItem>
          </List>
        </Feature>
        <Feature
          name='Ajackus Consulting LLP'
          years=''
          position='Associate Software Engineer'
          type='Full time'
          place='Mumbai, India'>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Worked on multiple projects using Laravel and Next.js frameworks
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Collaborated with senior engineer to implement best practices in code structure and quality
            </ListItem>
          </List>
        </Feature>
        <Feature
          name='IMTAC LLC'
          years='2018 - 2019'
          position='Dot Net Developer Intern'
          type='Internship'
          place='Oman'>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color='green.500' />
              Contributed to housing management system using C# and Microsoft SQL Server
            </ListItem>
          </List>
        </Feature>
      </Box>
    </Box>
  );
};

export default Experience;
