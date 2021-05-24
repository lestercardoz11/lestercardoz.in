import { email, socialMedia } from '@/config';
import {
  Box,
  Flex,
  Link,
  useColorModeValue,
  SlideFade,
  IconButton,
} from '@chakra-ui/react';
import { Icon } from '@/components/icons';

const Email = () => (
  <Box
    position={'absolute'}
    bottom={0}
    right={12}
    display={{ base: 'none', md: 'flex' }}>
    <SlideFade in={true} offsetY={100}>
      <Flex
        direction='column'
        align='center'
        justify='center'
        position='relative'
        _after={{
          content: `''`,
          display: 'block',
          width: '1px',
          height: '90px',
          margin: '0 auto',
          backgroundColor: useColorModeValue('gray.600', 'white'),
        }}>
        <Link
          href={`mailto:${email}`}
          m='20px auto'
          p='10px'
          letterSpacing='2px'
          border='2px solid transparent'
          borderRadius='5px'
          sx={{ writingMode: 'vertical-rl' }}
          _hover={{
            textDecoration: 'none',
            transform: 'translateY(-2.5px)',
            transition: 'transform ease 0.2s',
          }}>
          {email}
        </Link>
      </Flex>
    </SlideFade>
  </Box>
);

const SocialLinks = () => (
  <Box
    position={'absolute'}
    bottom={0}
    left={12}
    display={{ base: 'none', md: 'flex' }}>
    <SlideFade in={true} offsetY={100}>
      <Flex
        direction='column'
        align='center'
        justify='center'
        position='relative'
        _after={{
          content: `''`,
          display: 'block',
          width: '1px',
          height: '90px',
          margin: '0 auto',
          backgroundColor: useColorModeValue('gray.600', 'white'),
        }}>
        <Flex
          mb='20px'
          px='10px'
          direction='column'
          align='center'
          justify='center'>
          {socialMedia &&
            socialMedia.map(({ url, name }, i) => (
              <Box h={5} w={5} my={5} key={i}>
                <Link
                  href={url}
                  aria-label={name}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <Icon name={name} />
                </Link>
              </Box>
            ))}
        </Flex>
      </Flex>
    </SlideFade>
  </Box>
);

const Social = () => (
  <>
    <SocialLinks />
    <Email />
  </>
);

export default Social;
