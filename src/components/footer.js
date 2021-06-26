import { Box, Text, Divider } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box>
      <Divider />
      <Text
        pt={6}
        fontSize={'md'}
        fontWeight={'semibold'}
        letterSpacing={'wide'}
        textAlign={'center'}>
        © 2021 Lester Cardoz. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
