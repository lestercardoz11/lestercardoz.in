import React, { useState } from 'react';
import {
  Flex,
  Link,
  Heading,
  Text,
  Stack,
  Box,
  useColorModeValue,
  Badge,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { featuredProjectsData } from 'src/data';

const Feature = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  const bg = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.100');

  return (
    <Box mb={10}>
      <Link
        href={project.href}
        isExternal
        _hover={{ textDecoration: 'none' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <Flex align='center' bg={bg} rounded='lg' p={6}>
          <Stack w='full'>
            <Flex justify='space-between' align='center'>
              <Heading size='md' fontWeight='bold'>
                {project.title}
              </Heading>
              <ExternalLinkIcon fontSize='2xl' opacity={hovered ? 1 : 0} />
            </Flex>

            <Box color={textColor}>
              <List spacing={3}>
                {project.points.map((point, idx) => (
                  <ListItem key={idx}>
                    <ListIcon as={CheckCircleIcon} color='green.500' />
                    {point}
                  </ListItem>
                ))}
              </List>
            </Box>

            <Flex pt={3} flexWrap='wrap'>
              {project.languages.map((lang, idx) => (
                <Badge key={idx} m={1} letterSpacing='wider' colorScheme='teal'>
                  {lang}
                </Badge>
              ))}
            </Flex>
          </Stack>
        </Flex>
      </Link>
    </Box>
  );
};

const FeaturedProjects = () => {
  return (
    <Box w='auto'>
      <Box>
        <Text mb={2} fontSize={{ base: '3xl', md: '5xl' }} fontWeight='bold'>
          Featured Projects
        </Text>
      </Box>

      <Box py={20} mx='auto'>
        {featuredProjectsData.map((project, index) => (
          <Feature key={index} project={project} />
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedProjects;
