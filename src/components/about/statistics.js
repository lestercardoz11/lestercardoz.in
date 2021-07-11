import { Box, Flex, Stack, SimpleGrid } from '@chakra-ui/layout';
import {
  Text,
  useColorModeValue,
  Skeleton,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  Icon,
} from '@chakra-ui/react';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';
import { RiUser6Line, RiGitRepositoryFill, RiStarFill } from 'react-icons/ri';

const Feature = (props) => {
  const { title, tech, icon, color, stat, isLoading } = props;
  return (
    <Skeleton isLoaded={!isLoading}>
      <Box
        px={2}
        bg={useColorModeValue('gray.100', 'gray.900')}
        color={useColorModeValue('gray.600', 'gray.400')}
        shadow={'md'}
        rounded={'lg'}>
        <Box p={2} w={'full'}>
          <Flex
            direction={'row'}
            p={2}
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight={'medium'}>
            <Box w={'35%'}>
              <Flex
                w={14}
                h={14}
                bg={`${color}.500`}
                rounded={'full'}
                justify={'center'}
                align={'center'}>
                <Icon as={icon} w={6} h={6} color='white' />
              </Flex>
            </Box>
            <Flex direction={'column'} w={'65%'}>
              <Box textAlign={'end'} fontSize={'sm'} letterSpacing={'wider'}>
                {title}
              </Box>
              <Box
                textAlign={'end'}
                fontSize={'3xl'}
                color={useColorModeValue('gray.800', 'white')}>
                {stat}
              </Box>
            </Flex>
          </Flex>
          <Divider py={1} />
          <Box
            p={2}
            fontSize={'sm'}
            fontWeight={'medium'}
            letterSpacing={'widest'}
            textTransform={'uppercase'}>
            {tech}
          </Box>
        </Box>
      </Box>
    </Skeleton>
  );
};

const Statistics = () => {
  const { data, isLoading, error } = useSWR('/api/github-stats', fetcher);

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
        <Box w='full' px={[10, , 4]} mx='auto' textAlign='center'>
          <Text mb={2} fontSize='5xl' fontWeight='bold' lineHeight='tight'>
            All Projects
          </Text>
        </Box>
        <Box w='full' py={20}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={[16, 8]}>
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

  const { followers, projects, stars } = data;

  const githubFollowers = followers.toLocaleString();
  const githubRepos = projects.toLocaleString();
  const githubStars = stars.toLocaleString();

  return (
    <Box my={10} w={'auto'}>
      <Box pt='10'>
        <Box w='full' px={[10, , 4]} mx='auto' textAlign='center'>
          <Text
            mb={2}
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight='bold'
            lineHeight='tight'>
            Statistics
          </Text>
        </Box>
        <Box w='full' py={20}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            <Feature
              title={'Followers'}
              tech={'Github'}
              stat={githubFollowers}
              icon={RiUser6Line}
              color={'pink'}
              isLoading={isLoading}
            />
            <Feature
              title={'Repositories'}
              tech={'Github'}
              stat={githubRepos}
              icon={RiGitRepositoryFill}
              color={'purple'}
              isLoading={isLoading}
            />
            <Feature
              title={'Stars'}
              tech={'Github'}
              stat={githubStars}
              icon={RiStarFill}
              color={'blue'}
              isLoading={isLoading}
            />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Statistics;
