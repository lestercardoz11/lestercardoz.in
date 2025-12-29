import { Box, Flex, Stack, SimpleGrid } from '@chakra-ui/react';
import { Text, useColorModeValue } from '@chakra-ui/react';
import { technologiesData } from 'src/data';

const Feature = ({ label, color }) => {
  return (
    <Flex align='center'>
      <Flex
        align='center'
        justify='center'
        w={4}
        h={4}
        rounded='full'
        bg={`${color}.400`}
        color={useColorModeValue(`${color}.600`, `${color}.100`)}
      />
      <Flex h={8} ml={4} align='center'>
        <Text
          fontWeight='semibold'
          letterSpacing='widest'
          color={useColorModeValue('gray.700', 'gray.400')}>
          {label}
        </Text>
      </Flex>
    </Flex>
  );
};

const Technologies = () => {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const titleColor = useColorModeValue('gray.700', 'gray.400');

  return (
    <Box my={10} w='auto'>
      <Box pt={10}>
        <Box>
          <Text mb={2} fontSize={{ base: '3xl', md: '5xl' }} fontWeight='bold'>
            Technologies
          </Text>
        </Box>

        <Box py={20}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 16, md: 8 }}>
            {technologiesData.map((section, idx) => (
              <Box key={idx} rounded='lg' shadow='md' bg={bg}>
                <Flex
                  direction='column'
                  p={6}
                  borderBottomWidth='1px'
                  borderColor={borderColor}>
                  <Text
                    mb={1}
                    fontSize={{ base: 'sm', lg: 'xl' }}
                    fontWeight='bold'
                    letterSpacing='widest'
                    textTransform='uppercase'
                    color={titleColor}>
                    {section.category}
                  </Text>
                </Flex>

                <Stack p={6} spacing={3}>
                  {section.items.map((tech, index) => (
                    <Feature key={index} label={tech.name} color={tech.color} />
                  ))}
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Technologies;
