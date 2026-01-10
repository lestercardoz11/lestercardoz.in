import Link from 'next/link';
import { Button, Center, Flex, Stack } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import NotFoundIllustration from '@/components/ui/NotFoundIllustration';

export default function FourOhFour() {
  return (
    <Center h={'100vh'} w={'100%'} bg={'white'}>
      <Flex direction='column' align='center' justify='center' w='50%'>
        <NotFoundIllustration />

        <Stack direction='row' m={10} align='center'>
          <Link href='/'>
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme='teal'
              variant='solid'>
              Go back home
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Center>
  );
}
