import {
  Box,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import { RiUser6Line, RiGitRepositoryFill, RiStarFill } from 'react-icons/ri';
import StatCard from '../ui/StatCard';

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
        <Box>
          <Text mb={2} fontSize='5xl' fontWeight='bold' lineHeight='tight'>
            Statistics
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
        <Box>
          <Text mb={2} fontSize='5xl' fontWeight='bold' lineHeight='tight'>
            Statistics
          </Text>
        </Box>
        <Box w='full' py={20}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            <StatCard
              title={'Followers'}
              tech={'Github'}
              stat={githubFollowers}
              icon={RiUser6Line}
              color={'pink'}
              isLoading={isLoading}
            />
            <StatCard
              title={'Repositories'}
              tech={'Github'}
              stat={githubRepos}
              icon={RiGitRepositoryFill}
              color={'purple'}
              isLoading={isLoading}
            />
            <StatCard
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
