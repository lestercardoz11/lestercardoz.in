import { Box } from '@chakra-ui/layout';
import { Text, Flex, HStack, Image } from '@chakra-ui/react';
import { useState } from 'react';

const Testimonials = () => {
  const arrowStyles = {
    cursor: 'pointer',
    pos: 'absolute',
    top: '50%',
    w: 'auto',
    mt: '-22px',
    p: '16px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: '0.6s ease',
    borderRadius: '0 3px 3px 0',
    userSelect: 'none',
    _hover: {
      opacity: 0.8,
      bg: 'black',
    },
  };
  const slides = [
    {
      img: '/images/04-2024.webp',
    },
    {
      img: '/images/10-2023.webp',
    },
    {
      img: '/images/06-2023.webp',
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <Box my={10} w={'auto'}>
      <Box pt='10'>
        <Box w='full' px={{ base: 10, lg: 4 }} mx='auto' textAlign='center'>
          <Text
            mb={2}
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight='bold'
            lineHeight='tight'>
            Testimonials
          </Text>
        </Box>
        <Box w='full' py='20' mx='auto'>
          <Flex
            w='full'
            alignItems='center'
            justifyContent='center'
            rounded={'lg'}
            shadow={'md'}
            overflow={'hidden'}>
            <Flex w='full' overflow='hidden' pos='relative'>
              <Flex h='400px' w='full' {...carouselStyle}>
                {slides.map((slide, sid) => (
                  <Box
                    key={`slide-${sid}`}
                    boxSize='full'
                    shadow='md'
                    flex='none'>
                    <Text
                      color='white'
                      fontSize='xs'
                      p='8px 12px'
                      pos='absolute'
                      top='0'>
                      {sid + 1} / {slidesCount}
                    </Text>
                    <Image
                      src={slide.img}
                      alt={'Testimonial ' + sid}
                      boxSize='full'
                      backgroundSize='cover'
                    />
                  </Box>
                ))}
              </Flex>
              <Text {...arrowStyles} left='0' onClick={prevSlide}>
                &#10094;
              </Text>
              <Text {...arrowStyles} right='0' onClick={nextSlide}>
                &#10095;
              </Text>
              <HStack justify='center' pos='absolute' bottom='8px' w='full'>
                {Array.from({
                  length: slidesCount,
                }).map((_, slide) => (
                  <Box
                    key={`dots-${slide}`}
                    cursor='pointer'
                    boxSize={['7px', null, '15px']}
                    m='0 2px'
                    bg={
                      currentSlide === slide
                        ? 'blackAlpha.500'
                        : 'blackAlpha.200'
                    }
                    rounded='50%'
                    display='inline-block'
                    transition='background-color 0.6s ease'
                    _hover={{
                      bg: 'blackAlpha.500',
                    }}
                    onClick={() => setSlide(slide)}></Box>
                ))}
              </HStack>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonials;
