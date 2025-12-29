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
                  Leadership
                </Text>
              </Flex>
              <Stack direction='column' p='6' spacing='3' flexGrow='1'>
                <Feature color='red'>Team Management</Feature>
                <Feature color='pink'>Technical Mentorship</Feature>
                <Feature color='yellow'>Resource Planning</Feature>
                <Feature color='green'>Agile/SCRUM</Feature>
                <Feature color='purple'>Project Estimation</Feature>
                <Feature color='blue'>Solution Architecture</Feature>
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
                  Development
                </Text>
              </Flex>
              <Stack direction='column' p='6' spacing='3' flexGrow='1'>
                <Feature color='red'>JavaScript</Feature>
                <Feature color='pink'>Java</Feature>
                <Feature color='yellow'>C#</Feature>
                <Feature color='green'>Python</Feature>
                <Feature color='purple'>Angular</Feature>
                <Feature color='blue'>React</Feature>
                <Feature color='red'>Next.js</Feature>
                <Feature color='pink'>Spring</Feature>
                <Feature color='yellow'>Laravel</Feature>
                <Feature color='green'>.NET</Feature>
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
                  Database/Cloud
                </Text>
              </Flex>
              <Stack direction='column' p='6' spacing='3' flexGrow='1'>
                <Feature color='red'>PostgreSQL</Feature>
                <Feature color='pink'>MongoDB</Feature>
                <Feature color='yellow'>MySQL</Feature>
                <Feature color='green'>AWS Amplify</Feature>
                <Feature color='purple'>GitHub Actions</Feature>
                <Feature color='blue'>Docker</Feature>
                <Feature color='red'>CI/CD</Feature>
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
                  ServiceNow
                </Text>
              </Flex>
              <Stack direction='column' p='6' spacing='3' flexGrow='1'>
                <Feature color='red'>ITSM</Feature>
                <Feature color='pink'>ITOM</Feature>
                <Feature color='yellow'>GRC</Feature>
                <Feature color='green'>SecOps</Feature>
                <Feature color='purple'>HRSD</Feature>
                <Feature color='blue'>ITAM</Feature>
                <Feature color='red'>IRM</Feature>
                <Feature color='pink'>RPA</Feature>
                <Feature color='yellow'>Flow Designer</Feature>
                <Feature color='green'>UI Builder</Feature>
              </Stack>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Technologies;
