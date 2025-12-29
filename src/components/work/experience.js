import {
  Box,
  Flex,
  Stack,
  Text,
  Heading,
  Badge,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { experienceData } from 'src/data';

const Feature = ({ experience }) => {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.100');

  return (
    <Flex align='center' bg={bg} rounded='lg' p={6} mb={10}>
      <Stack w='full'>
        <Flex justify='space-between' direction={{ base: 'column', md: 'row' }}>
          <Box>
            <Heading size='md' fontWeight='bold'>
              {experience.position}
            </Heading>
            <Text>
              {experience.name}, {experience.place}
            </Text>
          </Box>

          <Box textAlign={{ base: 'left', md: 'right' }}>
            <Text fontStyle='italic' fontSize='14px' color='gray.600'>
              {experience.years}
            </Text>
            <Badge mt={1} letterSpacing='wider' colorScheme='teal'>
              {experience.type}
            </Badge>
          </Box>
        </Flex>

        <Box color={textColor}>
          <List spacing={3}>
            {experience.points.map((point, idx) => (
              <ListItem key={idx}>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                {point}
              </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
    </Flex>
  );
};

const Experience = () => {
  return (
    <Box w='auto'>
      <Box>
        <Text mb={2} fontSize={{ base: '3xl', md: '5xl' }} fontWeight='bold'>
          Experience
        </Text>
      </Box>

      <Box maxW='7xl' py={20} mx='auto'>
        {experienceData.map((exp, index) => (
          <Feature key={index} experience={exp} />
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
