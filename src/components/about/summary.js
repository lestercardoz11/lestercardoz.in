import { Box, Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import {
  Heading,
  Avatar,
  Text,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  GridItem,
  Link,
  Code,
  Alert,
  AlertIcon,
  AlertTitle,
  Skeleton,
} from '@chakra-ui/react';
import { IoMusicalNotesOutline, IoPinOutline } from 'react-icons/io5';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import Resume from './resume';
import { SummaryText } from './SummaryText';

const getRecentlyPlayed = () => {
  const { data, error } = useSWR('/api/recently-played', fetcher);

  if (error) {
    return {
      recentlyPlayed: null,
    };
  }

  return {
    recentlyPlayed: data,
  };
};

const Summary = () => {
  const { data, isLoading, error } = useSWR('/api/now-playing', fetcher);

  const { recentlyPlayed } = getRecentlyPlayed();

  if (error)
    return (
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
          <Alert status='error' variant='top-accent'>
            <AlertIcon />
            <AlertTitle mr={2}>
              Please check your internet connection.
            </AlertTitle>
          </Alert>
        </div>
      </div>
    );

  return (
    <Flex direction={'column'}>
      <SimpleGrid columns={{ base: 1, md: 5 }} spacing={10}>
        <GridItem colSpan={2}>
          <Flex direction='column' h='full'>
            <Heading
              mb={6}
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight='bold'
              color={useColorModeValue('brand.600', 'gray.300')}
              lineHeight='shorter'>
              Hey,
              <br />
              I'm{' '}
              <Text
                display={'inline'}
                w='full'
                bgClip='text'
                bgGradient='linear(to-l, #E15299, #E15299)'
                fontWeight='extrabold'>
                Lester Cardoz
              </Text>
            </Heading>
            <Box
              position={'relative'}
              w={'full'}
              bg={useColorModeValue('gray.100', 'gray.900')}
              shadow={'lg'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}>
              <Avatar
                size={'2xl'}
                src={'/images/profile-img.png'}
                alt={'Avatar Alt'}
                loading='eager'
                mb={4}
              />
              <Text fontWeight={600} color={'gray.500'} mb={4}>
                Technical Lead Manager
              </Text>

              <Stack
                align={'flex-start'}
                justify={'flex-start'}
                direction={'column'}
                textAlign={'left'}
                mt={6}>
                <Text
                  fontSize='sm'
                  fontWeight={600}
                  color={'gray.500'}
                  textTransform='uppercase'>
                  Currently
                </Text>
                {data && recentlyPlayed && !isLoading ? (
                  <List spacing={3} w={'full'}>
                    <ListItem
                      p={2}
                      border={'solid 2px transparent'}
                      rounded={'md'}
                      cursor={'pointer'}
                      _hover={{ color: '#48BB78' }}>
                      <Link
                        href='https://goo.gl/maps/GChA92K1R4mSGEWH9'
                        target='_blank'
                        _hover={{ textDecoration: 'none' }}
                        _focus={{ outline: 'none' }}>
                        <Flex direction={'row'} align={'center'}>
                          <ListIcon
                            w={6}
                            h={6}
                            as={IoPinOutline}
                            color='green.400'
                          />
                          <Flex direction={'column'} ml={2} fontSize={'md'}>
                            Mumbai
                            <Text
                              fontSize={'xs'}
                              color={useColorModeValue('gray.800', 'white')}>
                              India
                            </Text>
                          </Flex>
                        </Flex>
                      </Link>
                    </ListItem>
                    {(data.title || recentlyPlayed.title) && (
                      <ListItem
                        p={2}
                        border={'solid 2px transparent'}
                        rounded={'md'}
                        cursor={'pointer'}
                        _hover={{ color: '#48BB78' }}>
                        <Link
                          href={
                            data.songUrl ? data.songUrl : recentlyPlayed.songUrl
                          }
                          target='_blank'
                          _hover={{ textDecoration: 'none' }}
                          _focus={{ outline: 'none' }}>
                          <Flex direction={'row'} align={'center'}>
                            <ListIcon
                              w={6}
                              h={6}
                              as={IoMusicalNotesOutline}
                              color='green.400'
                            />
                            <Flex direction={'column'} ml={2} fontSize={'md'}>
                              {data.title ? data.title : recentlyPlayed.title}
                              <Text
                                fontSize={'xs'}
                                color={useColorModeValue('gray.800', 'white')}>
                                {data.artist
                                  ? data.artist
                                  : recentlyPlayed.artist}
                              </Text>
                            </Flex>
                          </Flex>
                        </Link>
                      </ListItem>
                    )}
                  </List>
                ) : (
                  <Flex direction={'column'} w={'full'}>
                    <Box py='2' my='2'>
                      <Stack>
                        <Skeleton height='30px' />
                        <Skeleton height='10px' />
                      </Stack>
                    </Box>
                    <Box py='2' my='2'>
                      <Stack>
                        <Skeleton height='30px' />
                        <Skeleton height='10px' />
                      </Stack>
                    </Box>
                    <Box py='2' my='2'>
                      <Stack>
                        <Skeleton height='30px' />
                        <Skeleton height='10px' />
                      </Stack>
                    </Box>
                  </Flex>
                )}
              </Stack>

              <Resume />
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={3}>
          <SummaryText />
        </GridItem>
      </SimpleGrid>
    </Flex>
  );
};

export default Summary;
