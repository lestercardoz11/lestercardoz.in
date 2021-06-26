import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Input,
  Textarea,
} from '@chakra-ui/react';

const Contact = () => {
  return (
    <Box mx={60} mt={'15vh'} w={'auto'} h={'50vh'}>
      <Box
        pos='relative'
        flex={1}
        bg={'blue.200'}
        h={'100%'}
        borderRadius={'xl'}>
        <Box
          pos='absolute'
          top={'-15%'}
          right={0}
          w={'70%'}
          h={'130%'}
          p={5}
          pt={10}
          bg={'white'}
          textColor={'gray.800'}
          boxShadow='xl'
          borderRadius={'xl'}>
          <Grid
            h='100%'
            templateRows='repeat(6, 1fr)'
            templateColumns='repeat(2, 1fr)'
            gap={4}>
            <GridItem colSpan={1}>
              <Input
                variant='filled'
                placeholder='Name'
                bg={'gray.200'}
                fontWeight={600}
                _placeholder={{ color: 'gray.400', fontWeight: 500 }}
                size='md'
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Input
                variant='filled'
                placeholder='Phone'
                bg={'gray.200'}
                fontWeight={600}
                _placeholder={{ color: 'gray.400', fontWeight: 500 }}
                size='md'
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Input
                variant='filled'
                placeholder='Email'
                bg={'gray.200'}
                fontWeight={600}
                _placeholder={{ color: 'gray.400', fontWeight: 500 }}
                size='md'
              />
            </GridItem>
            <GridItem colSpan={2} rowSpan={3}>
              <Textarea
                variant='filled'
                h={'100%'}
                placeholder='Message'
                fontWeight={600}
                bg={'gray.200'}
                _placeholder={{ color: 'gray.400', fontWeight: 500 }}
                size='md'
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Flex justify={'flex-end'}>
                <Button bg={'blue.200'}>Submit</Button>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
