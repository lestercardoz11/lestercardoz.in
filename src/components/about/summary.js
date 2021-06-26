import { Box, Flex, SimpleGrid, Stack } from '@chakra-ui/layout';
import {
  Heading,
  Avatar,
  Text,
  Button,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  GridItem,
  Link,
} from '@chakra-ui/react';
import {
  IoDesktopOutline,
  IoMusicalNotesOutline,
  IoPinOutline,
} from 'react-icons/io5';

const Summary = () => {
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
            I'm a software developer who specializes in building and designing
            exceptional digital experiences. I work at Ajackus as a Software
            Developer.
            <br />
            <br />
            I’m a fast learner. I love to learn new programming languages and
            paradigms to build high-quality software with them.
            <br />
            <br />
            I’m currently coding in Angular, TypeScript, and Node.js, but I’d
            love to learn other programming languages to write programs in. In
            the past years, I’ve also had the opportunity to code in PHP, Ruby,
            Python, and other languages.
            <br />
            <br />I also like to write frontend applications using React,
            Next.js, SASS, or just vanilla JS and CSS.
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
              Software Developer
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
                  <Flex direction={'row'} align={'center'}>
                    <ListIcon
                      w={6}
                      h={6}
                      as={IoMusicalNotesOutline}
                      color='green.400'
                    />
                    <Flex direction={'column'} ml={2} fontSize={'md'}>
                      6:30
                      <Text
                        fontSize={'xs'}
                        color={useColorModeValue('gray.800', 'white')}>
                        Geko ft. NSG
                      </Text>
                    </Flex>
                  </Flex>
                </ListItem>
                <ListItem
                  p={2}
                  border={'solid 2px transparent'}
                  rounded={'md'}
                  cursor={'pointer'}
                  _hover={{ color: '#48BB78' }}>
                  <Link
                    href='https://www.primevideo.com/detail/0KZY37OYHB13OROH35PXWORGDZ/ref=atv_dp_share_cu_r
                    '
                    target='_blank'
                    _hover={{ textDecoration: 'none' }}
                    _focus={{ outline: 'none' }}>
                    <Flex direction={'row'} align={'center'}>
                      <ListIcon
                        w={6}
                        h={6}
                        as={IoDesktopOutline}
                        color='green.400'
                      />
                      <Flex direction={'column'} ml={2} fontSize={'md'}>
                        Psych
                        <Text
                          fontSize={'xs'}
                          color={useColorModeValue('gray.800', 'white')}>
                          Sitcom
                        </Text>
                      </Flex>
                    </Flex>
                  </Link>
                </ListItem>
              </List>
            </Stack>

            <Button
              w={'full'}
              mt={8}
              bg={useColorModeValue('gray.300', 'gray.700')}
              color={useColorModeValue('gray.800', 'white')}
              rounded={'md'}
              _hover={{
                bg: useColorModeValue('gray.200', 'gray.800'),
              }}>
              Resume
            </Button>
          </Box>
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};

export default Summary;
