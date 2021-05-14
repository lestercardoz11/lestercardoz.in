import { navItems } from '@/config';
import {
  useColorMode,
  Button,
  Box,
  Text,
  Link,
  Flex,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  Stack,
  useDisclosure,
  Collapse,
  IconButton,
} from '@chakra-ui/react';
import {
  ArrowRightIcon,
  AtSignIcon,
  CloseIcon,
  EmailIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import Logo from './icons/logo';
import { email, socialMedia } from '@/config';
import { Icon } from '@/components/icons';
import { useState } from 'react';
import { SlideFade } from '@chakra-ui/react';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [social, setSocial] = useState(false);

  const onToggleSocials = () => {
    onClose();
    setSocial(!social);
  };

  return (
    <Box px={[0, 10]}>
      <Flex
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
        justifyContent={'space-between'}
      >
        {social ? (
          socialMedia && (
            <Flex
              flex={'auto'}
              display={{ base: 'flex', md: 'none' }}
              justify='center'
            >
              <Stack direction={'row'} spacing={6} align='center'>
                {socialMedia.map(({ url, name }, i) => (
                  <Box
                    as={Link}
                    key={i}
                    href={url}
                    aria-label={name}
                    target='_blank'
                    rel='noopener noreferrer'
                    w={5}
                    h={5}
                  >
                    <SlideFade in={social} reverse={!social} offsetY='-20px'>
                      <Icon name={name} />
                    </SlideFade>
                  </Box>
                ))}
                <Box
                  as={Link}
                  href={`mailto:${email}`}
                  w={6}
                  h={6}
                  align='flex-start'
                >
                  <SlideFade in={social} reverse={!social} offsetY='-20px'>
                    <EmailIcon h={5} w={5} />
                  </SlideFade>
                </Box>
              </Stack>
            </Flex>
          )
        ) : (
          <>
            <Flex
              flex={{ base: 1, md: 'auto' }}
              display={{ base: 'flex', md: 'none' }}
            >
              <SlideFade in={!social} reverse={social} offsetY='20px'>
                <IconButton
                  onClick={onToggle}
                  icon={
                    isOpen ? (
                      <CloseIcon w={3} h={3} />
                    ) : (
                      <HamburgerIcon w={5} h={5} />
                    )
                  }
                  variant={'ghost'}
                  aria-label={'Toggle Navigation'}
                  outline={'none'}
                />
              </SlideFade>
            </Flex>
            <Box as={Link} href={'/'} w={[100, 200]}>
              <SlideFade in={!social} reverse={social} offsetY='20px'>
                <Logo color={useColorModeValue('#1A202C', 'white')} />
              </SlideFade>
            </Box>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <Stack direction={'row'} spacing={10} align='center'>
                {navItems.map((navItem) => (
                  <DesktopNav navItem={navItem} key={navItem.name} />
                ))}
                <Box>
                  <IconButton onClick={toggleColorMode} mx='2'>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  </IconButton>
                </Box>
              </Stack>
            </Flex>
          </>
        )}
        <Flex
          flex={{ base: 1, md: 'auto' }}
          justifyContent={'flex-end'}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggleSocials}
            icon={
              social ? <CloseIcon w={3} h={3} /> : <AtSignIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            outline={'none'}
          />
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={useColorModeValue('white', 'gray.800')}
          p={4}
          display={{ md: 'none' }}
          align={'center'}
        >
          {navItems.map((navItem) => (
            <MobileNav navItem={navItem} onToggle={onToggle} />
          ))}
          <Stack spacing={4}>
            <Flex
              justify={'space-between'}
              align={'center'}
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Box>
                <Button mx='2'>
                  <ArrowRightIcon />
                </Button>
              </Box>
              <Box>
                <Button onClick={toggleColorMode} mx='2'>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Box>
            </Flex>
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
};

const DesktopNav = ({ navItem }) => {
  return (
    <Box>
      <Popover trigger={'hover'} placement={'bottom-start'}>
        <PopoverTrigger>
          <Link
            p={2}
            href={navItem.url ?? '#'}
            fontSize={'lg'}
            fontWeight={500}
            color={useColorModeValue('gray.600', 'gray.200')}
            _hover={{
              textDecoration: 'none',
              color: useColorModeValue('gray.800', 'white'),
            }}
          >
            {navItem.name}
          </Link>
        </PopoverTrigger>
      </Popover>
    </Box>
  );
};

const MobileNav = ({ navItem, onToggle }) => {
  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        as={Link}
        href={navItem.url ?? '#'}
        justify={'center'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {navItem.name}
        </Text>
      </Flex>
    </Stack>
  );
};

export default Navbar;
