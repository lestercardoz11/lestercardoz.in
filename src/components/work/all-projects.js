import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import {
  Flex,
  Text,
  Box,
  useColorModeValue,
  Badge,
  Grid,
  GridItem,
  Skeleton,
  SimpleGrid,
  Stack,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  StatHelpText,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { IoGitBranchOutline, IoFlashOutline } from 'react-icons/io5';

const Feature = ({
  name,
  description,
  star_count,
  language,
  code,
  homepage,
  isLoading,
}) => {
  return (
    <Box mb={5}>
      <Skeleton isLoaded={!isLoading}>
        <Box
          w='100%'
          bg={useColorModeValue('gray.100', 'gray.900')}
          rounded='lg'
          p={6}>
          <Flex justify='space-between'>
            <Flex align='center' pr={2}>
              {![
                'lestercardoz11.github.io',
                'lestercardoz11',
                'lestercardoz.com',
              ].includes(name) ? (
                <Text
                  fontSize='md'
                  fontWeight='bold'
                  letterSpacing='wide'
                  textTransform='capitalize'>
                  {name}
                </Text>
              ) : (
                <Text fontSize='md' fontWeight='bold' letterSpacing='wide'>
                  {name}
                </Text>
              )}
            </Flex>
            <Flex align='flex-start'>
              <Text h={6}>{star_count}</Text>
              <StarIcon h={6} ml={2} color='yellow.300' />
            </Flex>
          </Flex>
          <Flex align='center' my={3}>
            <Text
              color={useColorModeValue('gray.600', 'gray.100')}
              fontSize='sm'>
              {description}
            </Text>
          </Flex>
          <Flex w='100%' justify={'space-between'}>
            <Flex>
              {code && (
                <Link href={code} isExternal>
                  <Box
                    display={'flex'}
                    color='gray.500'
                    mr={3}
                    _focus={{
                      outline: 'none',
                    }}>
                    <IoGitBranchOutline />
                    <Text fontWeight='normal' fontSize='xs' marginStart={1}>
                      Code
                    </Text>
                  </Box>
                </Link>
              )}
              {homepage && (
                <Link href={homepage} marginStart={2} isExternal>
                  <Box
                    display={'flex'}
                    color='gray.500'
                    _focus={{
                      outline: 'none',
                    }}>
                    <IoFlashOutline />
                    <Text fontWeight='normal' fontSize='xs' marginStart={1}>
                      Demo
                    </Text>
                  </Box>
                </Link>
              )}
            </Flex>
            {language && (
              <Badge letterSpacing='wider' colorScheme='teal'>
                {language}
              </Badge>
            )}
          </Flex>
        </Box>
      </Skeleton>
    </Box>
  );
};

const AllProjects = () => {
  const { data, isLoading, error } = useSWR('/api/projects', fetcher);
  let column1 = [];
  let column2 = [];
  let column3 = [];

  if (error)
    return (
      <div style={{ width: '100%' }}>
        <Alert status='error' variant='top-accent'>
          <AlertIcon />
          <AlertTitle mr={2}>Please check your internet connection.</AlertTitle>
        </Alert>
      </div>
    );
  if (!data)
    return (
      <Box w={'auto'}>
        <Box w='100%' px={{ base: 10, lg: 4 }} mx='auto' textAlign='center'>
          <Text mb={2} fontSize='5xl' fontWeight='bold' lineHeight='tight'>
            All Projects
          </Text>
        </Box>
        <Box w='100%' py={20}>
          <SimpleGrid columns={3} spacing='20px'>
            <Stack>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
            </Stack>
            <Stack>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
            </Stack>
            <Stack>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
            </Stack>
          </SimpleGrid>
        </Box>
      </Box>
    );

  const filteredProjects = Object(data.repos).sort(
    (a, b) => Number(b.stars) - Number(a.stars)
  );

  for (let i = 0; i < filteredProjects.length; i++) {
    if (i % 2 === 0) {
      column2.push(filteredProjects[i]);
    } else {
      column1.push(filteredProjects[i]);
    }
  }

  return (
    <Box w='100%'>
      <Box w='100%' px={{ base: 10, lg: 4 }} textAlign='center'>
        <Text
          mb={2}
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight='bold'
          lineHeight='tight'>
          All Projects
        </Text>
      </Box>
      <Box w='100%' py='20'>
        {!filteredProjects.length ? (
          'No projects found.'
        ) : (
          <Grid
            w='100%'
            templateColumns={{
              base: 'repeat(1, 1fr)',
              lg: 'repeat(2, 1fr)',
            }}
            gap={{ base: 3, lg: 5 }}>
            <GridItem colSpan={1}>
              <Flex direction={'column'}>
                {column2.map((project2) => (
                  <Feature
                    key={project2.name}
                    name={project2.name?.replaceAll('-', ' ')}
                    star_count={project2.stars}
                    code={project2.url}
                    description={project2.description}
                    language={project2.language}
                    homepage={project2.homepage}
                    isLoading={isLoading}></Feature>
                ))}
              </Flex>
            </GridItem>
            <GridItem colSpan={1} w={'100%'}>
              <Flex direction={'column'}>
                {column1.map((project1) => (
                  <Feature
                    key={project1.name}
                    name={project1.name?.replaceAll('-', ' ')}
                    star_count={project1.stars}
                    code={project1.url}
                    description={project1.description}
                    language={project1.language}
                    homepage={project1.homepage}
                    isLoading={isLoading}></Feature>
                ))}
              </Flex>
            </GridItem>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default AllProjects;
