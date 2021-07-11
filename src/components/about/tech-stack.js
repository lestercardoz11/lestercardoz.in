import { Box } from '@chakra-ui/layout';
import { Link, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

const TechnologyStack = () => {
  return (
    <Box my={10} w={'auto'}>
      <Box pt='10'>
        <Box w='full' px={{ base: 10, lg: 4 }} mx='auto' textAlign='center'>
          <Text
            mb={2}
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight='bold'
            lineHeight='tight'>
            Tech Stack
          </Text>
        </Box>
        <Box w='full' py='20' mx='auto'>
          <Text size='sm' mb={5} letterSpacing={'wide'}>
            This website uses the following technologies.
          </Text>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th w={'25%'}>Name</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Link
                    href='https://nextjs.org/'
                    target='_blank'
                    _hover={{ textDecoration: 'none', color: '#48BB78' }}
                    _focus={{ outline: 'none' }}>
                    Next JS
                  </Link>
                </Td>
                <Td>
                  JS framework is used for this website. Next.js is a React
                  framework that enables several extra features, including
                  server-side rendering and generating static websites
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Link
                    href='https://chakra-ui.com/'
                    target='_blank'
                    _hover={{ textDecoration: 'none', color: '#48BB78' }}
                    _focus={{ outline: 'none' }}>
                    Chakra UI
                  </Link>
                </Td>
                <Td>
                  CSS framework used for this website. Chakra UI is a simple,
                  modular and accessible component library that gives you the
                  building blocks you need to build your React applications.
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Link
                    href='https://vercel.com/'
                    target='_blank'
                    _hover={{ textDecoration: 'none', color: '#48BB78' }}
                    _focus={{ outline: 'none' }}>
                    Vercel
                  </Link>
                </Td>
                <Td>
                  Platform used to deploy this website. ​Vercel is a deployment
                  and collaboration platform for frontend developers.
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Link
                    href='https://docs.github.com/en/rest'
                    target='_blank'
                    _hover={{ textDecoration: 'none', color: '#48BB78' }}
                    _focus={{ outline: 'none' }}>
                    GitHub REST API
                  </Link>
                </Td>
                <Td>
                  API used to interact with GitHub and retrieve information
                  related to my github account.
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Link
                    href='https://developer.spotify.com/documentation/web-api/'
                    target='_blank'
                    _hover={{ textDecoration: 'none', color: '#48BB78' }}
                    _focus={{ outline: 'none' }}>
                    Spotify Web API
                  </Link>
                </Td>
                <Td>
                  API used to interact with Spotify and retrieve information
                  related to my spotify account.
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default TechnologyStack;
