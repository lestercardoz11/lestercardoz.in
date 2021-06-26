import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const Logo = () => (
  <Flex
    h={'full'}
    p={2}
    bg={useColorModeValue('gray.800', 'white')}
    color={useColorModeValue('white', 'gray.800')}
    fontFamily={'heading'}
    fontSize={'lg'}
    fontWeight={'extrabold'}
    letterSpacing={'wider'}
    textTransform={'uppercase'}
    justify={'center'}>
    Lester.
  </Flex>
);

export default Logo;
