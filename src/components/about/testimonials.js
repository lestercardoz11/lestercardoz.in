import {
  Box,
  Flex,
  Text,
  Avatar,
  Stack,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Image,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonialsData } from 'src/data';

const TestimonialCard = ({ testimonial }) => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const hoverBg = useColorModeValue('gray.100', 'gray.800');

  const cardContent = (
    <Box
      bg={bg}
      rounded='lg'
      p={8}
      h='full'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      transition='all 0.1s ease'
      borderWidth={'2px'}
      cursor={testimonial.link ? 'pointer' : 'default'}
      _hover={
        testimonial.link
          ? { bg: hoverBg, borderColor: '#48BB78', borderWidth: '2px' }
          : {}
      }>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='start'
        mb={6}>
        {/* Company */}
        <Image
          src={testimonial.companyLogo}
          alt={testimonial.company}
          width='80px'
          mb={4}
        />
        <Text
          color={textColor}
          fontSize='xs'
          fontWeight='bold'
          textTransform='uppercase'
          lineHeight='tall'>
          {testimonial.date}
        </Text>
      </Box>

      {/* Quote */}
      <Stack spacing={4} flex='1'>
        <Icon as={FaQuoteLeft} boxSize={6} color='#48BB78' />
        <Text
          color={textColor}
          fontSize='md'
          fontWeight={'medium'}
          lineHeight='tall'>
          {testimonial.quote}
        </Text>
      </Stack>

      {/* Author */}
      <Flex mt={8} align='center'>
        <Avatar src={testimonial.avatar} mr={4} />
        <Box>
          <Text fontWeight='bold'>{testimonial.name}</Text>
          <Text fontSize='sm' color={textColor}>
            {testimonial.role}
          </Text>
        </Box>
      </Flex>
    </Box>
  );

  // If link is present, wrap with ChakraLink
  return testimonial.link ? (
    <ChakraLink
      href={testimonial.link}
      isExternal
      _hover={{ textDecoration: 'none' }}>
      {cardContent}
    </ChakraLink>
  ) : (
    cardContent
  );
};

const Testimonials = () => {
  return (
    <Box my={10} w='auto'>
      {/* Header */}
      <Box mb={16}>
        <Text color='#48BB78' fontWeight='semibold' mb={2}>
          Trusted by professionals
        </Text>
        <Text fontSize={{ base: '3xl', md: '5xl' }} fontWeight='bold'>
          What professionals say
        </Text>
      </Box>

      {/* Grid */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Testimonials;
