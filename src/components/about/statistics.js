import { Box, Flex, Stack, SimpleGrid } from '@chakra-ui/layout';
import {
  Text,
  useColorModeValue,
  Stat,
  StatLabel,
  Skeleton,
  StatNumber,
  Divider,
} from '@chakra-ui/react';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';

const Feature = (props) => {
  const { title, stat, isLoading } = props;
  return (
    <Skeleton isLoaded={!isLoading}>
      <Stat
        px={6}
        py={'5'}
        bg={useColorModeValue('gray.100', 'gray.900')}
        shadow={'md'}
        rounded={'lg'}>
        <Box w={'full'}>
          <StatLabel
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight={'medium'}
            isTruncated>
            {title}
          </StatLabel>
          <Divider py={1} />
          <StatNumber
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
      </Stat>
    </Skeleton>
  );
};

const Statistics = () => {
  const { data, isLoading, error } = useSWR('/api/github-stats', fetcher);

  if (error)
    return (
      <div style={{ width: '100%' }}>
        Please check your internet connnection.
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
              title={'Github Followers'}
              stat={githubFollowers}
              isLoading={isLoading}
            />
            <Feature
              title={'Github Repos'}
              stat={githubRepos}
              isLoading={isLoading}
            />
            <Feature
              title={'Github Stars'}
              stat={githubStars}
              isLoading={isLoading}
            />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Statistics;
