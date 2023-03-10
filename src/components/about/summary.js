import { Box, Flex, SimpleGrid, Stack } from '@chakra-ui/layout';
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
import fetcher from '../../lib/fetcher';
import Resume from './resume';

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
    <SimpleGrid
      columns={{ base: 1, md: 5 }}
      spacing={0}
      _after={{
        bg: 'brand.500',
        opacity: 0.25,
        pos: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}>
      <GridItem colSpan={3}>
        <Flex direction='column' alignItems='start'>
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
          <Text
            pr={{ base: 0, md: 16 }}
            mb={4}
            fontSize={{ base: 'md', md: 'lg' }}
            color={useColorModeValue('brand.600', 'gray.400')}
            letterSpacing='wider'>
            I'm a software engineer who specializes in building and designing
            exceptional digital experiences. I work at{' '}
            <Link
              href='https://ajackus.com/'
              target='_blank'
              px={1}
              textDecoration={'none'}
              borderBottom={'.125em solid #27a9e1'}
              boxShadow={'inset 0 -0.125em 0 #27a9e1'}
              transition={
                'box-shadow 270ms cubic-bezier(0.77, 0, 0.175, 1), color 270ms cubic-bezier(0.77, 0, 0.175, 1)'
              }
              _hover={{
                color: 'white',
                boxShadow: 'inset 0 -1.125em 0 #27a9e1',
              }}
              _focus={{
                outline: 'none',
                background: '#27a9e1',
                color: '#fff',
                boxShadow: '8px 8px 24px rgba(0, 0, 0, 0.2)',
              }}>
              Ajackus
            </Link>{' '}
            as a Software Engineer.
            <br />
            <br />
            I love to learn new programming languages and paradigms to build
            high-quality software.
            <br />
            <br />
            I’m currently coding in <Code colorScheme='red'>Angular</Code>,{' '}
            <Code colorScheme='purple'>TypeScript</Code>,{' '}
            <Code colorScheme='blue'>Java</Code> and{' '}
            <Code colorScheme='green'>Spring</Code> but I love to learn other
            programming languages to write programs in as well. In the past
            years, I’ve also had the opportunity to code in{' '}
            <Code colorScheme='red'>PHP</Code>,{' '}
            <Code colorScheme='blue'>C#</Code>,{' '}
            <Code colorScheme='green'>Java</Code>,{' '}
            <Code colorScheme='purple'>Python</Code>, and other languages.
            <br />
            <br />I also like to write frontend applications using{' '}
            <Code colorScheme='purple'>React</Code>,{' '}
            <Code colorScheme='blue'>Next.js</Code>,{' '}
            <Code colorScheme='pink'>SASS</Code>, or just{' '}
            <Code colorScheme='green'>Vanilla JS</Code> and{' '}
            <Code colorScheme='blue'>CSS</Code>.
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex justify={'flex-end'}>
          <Box
            maxW={'320px'}
            w={'full'}
            bg={useColorModeValue('gray.100', 'gray.900')}
            shadow={'lg'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            <Avatar
              size={'2xl'}
              src={'/images/profile-img.jpeg'}
              alt={'Avatar Alt'}
              loading='eager'
              mb={4}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              Lester Cardoz
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
              Software Engineer
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
                            {data.artist ? data.artist : recentlyPlayed.artist}
                          </Text>
                        </Flex>
                      </Flex>
                    </Link>
                  </ListItem>
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
    </SimpleGrid>
  );
};

export default Summary;
