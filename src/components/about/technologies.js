import { Box, Flex, Stack, SimpleGrid } from '@chakra-ui/react';
import { Text, useColorModeValue } from '@chakra-ui/react';

const Feature = (props) => {
  const { color, children } = props;
  return (
    <Flex align='center'>
      <Flex
        alignItems='center'
        justifyContent='center'
        w={4}
        h={4}
        rounded='full'
        color={useColorModeValue(`${color}.600`, `${color}.100`)}
        bg={`${color}.400`}></Flex>
      <Flex h={8} ml={4} alignItems='center'>
        <Text
          fontWeight='semibold'
          letterSpacing='widest'
          color={useColorModeValue('gray.700', 'gray.400')}>
          {children}
        </Text>
      </Flex>
    </Flex>
  );
};

const Technologies = () => {
  return (
    <Box my={10} w={'auto'}>
      <Box pt='10'>
        <Box w='full' px={{ base: 10, lg: 4 }} mx='auto' textAlign='center'>
          <Text
            mb={2}
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight='bold'
            lineHeight='tight'>
            Technologies
          </Text>
        </Box>
        <Box w='full' py='20' mx='auto'>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={[16, 8]}>
            <Box
              rounded={'lg'}
              shadow={'md'}
              bg={useColorModeValue('gray.100', 'gray.900')}>
              <Flex
                direction='column'
                justify='center'
                align='center'
                p='6'
                borderBottomWidth='1px'
                borderColor={useColorModeValue('gray.200', 'gray.600')}>
                <Text
                  mb={1}
                  fontSize={{ base: 'sm', lg: 'xl' }}
                  fontWeight='bold'
                  letterSpacing='widest'
                  textTransform='uppercase'
                  color={useColorModeValue('gray.700', 'gray.400')}>
                  Frontend
                </Text>
              </Flex>
              <Stack direction='column' p='6' spacing='3' flexGrow='1'>
                <Feature color='red'>React</Feature>
                <Feature color='pink'>Angular</Feature>
                <Feature color='yellow'>Next.js</Feature>
                <Feature color='green'>Javascript</Feature>
                <Feature color='purple'>HTML/CSS</Feature>
                <Feature color='blue'>SASS</Feature>
              </Stack>
            </Box>

            <Box
              rounded={'lg'}
              shadow={'md'}
              bg={useColorModeValue('gray.100', 'gray.900')}>
              <Flex
                direction='column'
                justify='center'
                align='center'
                p='6'
                borderBottomWidth='1px'
                borderColor={useColorModeValue('gray.200', 'gray.600')}>
                <Text
                  mb={1}
                  fontSize={{ base: 'sm', lg: 'xl' }}
                  fontWeight='bold'
                  letterSpacing='widest'
                  textTransform='uppercase'
                  color={useColorModeValue('gray.700', 'gray.400')}>
                  Backend
                </Text>
              </Flex>
              <Stack direction='column' p='6' spacing='3' flexGrow='1'>
                <Feature color='teal'>Node.js</Feature>
                <Feature color='orange'>Laravel</Feature>
                <Feature color='pink'>ASP.NET</Feature>
                <Feature color='red'>C#</Feature>
                <Feature color='cyan'>Java</Feature>
                <Feature color='green'>Spring</Feature>
              </Stack>
            </Box>

            <Box
              rounded={'lg'}
              shadow={'md'}
              bg={useColorModeValue('gray.100', 'gray.900')}>
              <Flex
                direction='column'
                justify='center'
                align='center'
                p='6'
                borderBottomWidth='1px'
                borderColor={useColorModeValue('gray.200', 'gray.600')}>
                <Text
                  mb={1}
                  fontSize={{ base: 'sm', lg: 'xl' }}
                  fontWeight='bold'
                  letterSpacing='widest'
                  textTransform='uppercase'
                  color={useColorModeValue('gray.700', 'gray.400')}>
                  Database / CMS
                </Text>
              </Flex>
              <Stack direction='column' p='6' spacing='3' flexGrow='1'>
                <Feature color='purple'>PostgreSQL</Feature>
                <Feature color='blue'>Strapi</Feature>
                <Feature color='green'>MongoDB</Feature>
                <Feature color='teal'>MS SQL Server</Feature>
                <Feature color='yellow'>MySQL</Feature>
              </Stack>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Technologies;
