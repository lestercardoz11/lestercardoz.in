import React, { useState } from 'react';
import {
  Flex,
  Link,
  Heading,
  Text,
  Stack,
  Box,
  useColorModeValue,
  Badge,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon, CheckCircleIcon } from '@chakra-ui/icons';

const Feature = ({ title, href, languages, children }) => {
  const [opacity, setOpacity] = useState(0);
  return (
    <Box mb={10}>
      <Link
        href={href}
        title={title}
        target='_blank'
        rel='noopener noreferrer'
        _hover={{
          textDecoration: 'none',
        }}
        _focus={{
          outline: 'none',
        }}
        onMouseOver={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}>
        <Flex
          align='center'
          bg={useColorModeValue('gray.100', 'gray.900')}
          rounded={'lg'}
          p={6}>
          <Stack w={'full'}>
            <Flex justify='space-between'>
              <Heading as='h4' size='md' fontWeight='bold' mb={2}>
                {title}
              </Heading>
              <ExternalLinkIcon opacity={opacity} fontSize='2xl' />
            </Flex>
            <Text color={useColorModeValue('gray.600', 'gray.100')}>
              {children}
            </Text>
            <Flex
              w={'full'}
              justifyContent={'flex-start'}
              pt={3}
              flexWrap='wrap'>
              {languages.map((language, index) => (
                <Badge
                  key={index}
                  m={1}
                  letterSpacing='wider'
                  colorScheme='teal'>
                  {language}
                </Badge>
              ))}
            </Flex>
          </Stack>
        </Flex>
      </Link>
    </Box>
  );
};

const FeaturedProjects = () => {
  return (
    <Box w={'auto'}>
      <Box>
        <Box w='full' px={{ base: 10, lg: 4 }} mx='auto' textAlign='center'>
          <Text
            mb={2}
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight='bold'
            lineHeight='tight'>
            Featured Projects
          </Text>
        </Box>
        <Box w='full' py='20' mx='auto'>
          <Feature
            title='Opex Genie'
            href='https://www.opexgenie.com/'
            languages={['spring boot', 'angular', 'postgreSQL', 'aws']}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Developed the user interface which consists of multiple pages,
                data analysis, file uploads & downloads and charts.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Built the backend which consists of multiple APIs, bill
                analysis, bill extraction, file ingestion and logical
                calculation/features.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Created and automated tests for frontend and backend using
                GitHub actions.
              </ListItem>
            </List>
          </Feature>
          <Feature
            title='Tachnique'
            href='https://tacnique.com/'
            languages={['next.js', 'airtable api', 'tailwindcss']}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                HR platform designed to handle the hiring workflow.
                Communication with the candidates and in-depth details of the
                hired candidate.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Developed clean, responsive frontend UI from scratch using
                Next.js and Airtable API.
              </ListItem>
            </List>
          </Feature>
          <Feature
            title='Bangladesh Prime Minister'
            href='https://bhabpm.com/'
            languages={['next.js', 'strapi']}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Educational platform designed for the children of Bangladesh by
                the Bangladeshi Government that includes stories, games, quizzes
                and rewards.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Developed clean, responsive frontend UI from scratch using
                Next.js and StrapiCMS.
              </ListItem>
            </List>
          </Feature>

          <Feature
            title='Property Capsule'
            href='https://www.propertycapsule.com/'
            languages={['freemarker', 'html', 'css']}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Cloud-based technology platform to help users manage and present
                their property portfolio for a US company, VTS.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Migration of multiple websites from PHP to Freemarker.
              </ListItem>
            </List>
          </Feature>
          <Feature
            title='Safe Travel Barometer'
            href='https://dashboard.safetravelbarometer.com/'
            languages={[
              'laravel',
              'laravel backpack',
              'php',
              'next.js',
              'postgreSQL',
              'graphQL',
            ]}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                World’s most comprehensive B2B solution of COVID-19 health &
                safety protocols, and traveler experience initiatives.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                Developed backend and frontend features using Laravel, Laravel
                Backpack, PHP and Next.js for admin and dashboard UI.
              </ListItem>
            </List>
          </Feature>
          <Feature
            title='Bearing Fault Detection Using Comparative Analysis of Random Forest, ANN, and Autoencoder Methods'
            href='https://link.springer.com/chapter/10.1007/978-981-16-1089-9_14'
            languages={['machine learning', 'python', 'jupyter notebook']}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                The motive of this study is to reduce wastage of execution time
                and the annual expenditure loss due to missed alarms and failure
                to extract actual data from noise.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                The main intent of this paper is to assess the efficiency of
                Random Forest classification, Artificial Neural Networks and
                Autoencoder on bearing fault diagnosis.
              </ListItem>
            </List>
          </Feature>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedProjects;
