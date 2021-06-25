import React from 'react';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';
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
              {name != 'lestercardoz11.github.io' ? (
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
          <Flex w='full' justify={'space-between'}>
            <Flex>
              {code && (
                <Link href={code} isExternal>
                  <Button
                    variant='link'
                    color='gray.500'
                    mr={3}
                    leftIcon={<IoGitBranchOutline />}>
                    <Text fontWeight='normal' fontSize='xs'>
                      Code
                    </Text>
                  </Button>
                </Link>
              )}
              {homepage && (
                <Link href={homepage} isExternal>
                  <Button
                    variant='link'
                    color='gray.500'
                    leftIcon={<IoFlashOutline />}>
                    <Text fontWeight='normal' fontSize='xs'>
                      Demo
                    </Text>
                  </Button>
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
        Failed to load projects! Please check your internet connnection.
      </div>
    );
  if (!data)
    return (
      <Box w={'auto'}>
        <Box w='full' px={[10, , 4]} mx='auto' textAlign='center'>
          <Text mb={2} fontSize='5xl' fontWeight='bold' lineHeight='tight'>
            All Projects
          </Text>
        </Box>
        <Box w='full' py={20}>
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
    if (i % 3 === 0) {
      column3.push(filteredProjects[i]);
    } else if (i % 2 === 0) {
      column2.push(filteredProjects[i]);
    } else {
      column1.push(filteredProjects[i]);
    }
  }
  console.log(
    '🚀 ~ file: all-projects.js ~ line 107 ~ AllProjects ~ column1',
    column1
  );
  console.log(
    '🚀 ~ file: all-projects.js ~ line 109 ~ AllProjects ~ column2',
    column2
  );
  console.log(
    '🚀 ~ file: all-projects.js ~ line 111 ~ AllProjects ~ column3',
    column3
  );
  return (
    <Box w={'auto'}>
      <Box>
        <Box w='full' px={[10, , 4]} mx='auto' textAlign='center'>
          <Text mb={2} fontSize='5xl' fontWeight='bold' lineHeight='tight'>
            All Projects
          </Text>
        </Box>
        <Box maxW='7xl' py='20' mx='auto'>
          {!filteredProjects.length ? (
            'No projects found.'
          ) : (
            <Grid templateColumns='repeat(3, 1fr)' gap={5}>
              <GridItem colSpan={1}>
                <Flex direction={'column'}>
                  {column1.map((project) => (
                    <Feature
                      key={project.name}
                      name={project.name?.replaceAll('-', ' ')}
                      star_count={project.stars}
                      code={project.url}
                      description={project.description}
                      language={project.language}
                      homepage={project.homepage}
                      isLoading={isLoading}></Feature>
                  ))}
                </Flex>
              </GridItem>
              <GridItem colSpan={1}>
                <Flex direction={'column'}>
                  {column3.map((project) => (
                    <Feature
                      key={project.name}
                      name={project.name?.replaceAll('-', ' ')}
                      star_count={project.stars}
                      code={project.url}
                      description={project.description}
                      language={project.language}
                      homepage={project.homepage}
                      isLoading={isLoading}></Feature>
                  ))}
                </Flex>
              </GridItem>
              <GridItem colSpan={1}>
                <Flex direction={'column'}>
                  {column2.map((project) => (
                    <Feature
                      key={project.name}
                      name={project.name?.replaceAll('-', ' ')}
                      star_count={project.stars}
                      code={project.url}
                      description={project.description}
                      language={project.language}
                      homepage={project.homepage}
                      isLoading={isLoading}></Feature>
                  ))}
                </Flex>
              </GridItem>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AllProjects;
