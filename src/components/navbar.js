import { navItems, email, socialMedia } from '@/config';
import {
  useColorMode,
  Button,
  Box,
  Text,
  Link as ChakraLink,
  Flex,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  Stack,
  useDisclosure,
  Collapse,
  IconButton,
  Icon as ChakraIcon,
  SlideFade,
} from '@chakra-ui/react';
import {
  AtSignIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { IoMailOutline } from 'react-icons/io5';
import { Icon } from '@/components/icons';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
        justifyContent={'space-between'}>
        {social ? (
          socialMedia && (
            <Flex
              flex={{ base: 3, lg: 'auto' }}
              display={{ base: 'flex', lg: 'none' }}
              justify='center'>
              <Flex
                w={'full'}
                direction={'row'}
                justify='space-evenly'
                align='center'>
                {socialMedia.map(({ url, name }, i) => (
                  <Box
                    as={ChakraLink}
                    key={i}
                    href={url}
                    aria-label={name}
                    target='_blank'
                    rel='noopener noreferrer'
                    w={5}
                    h={5}>
                    <SlideFade in={social} reverse={!social} offsetY={-20}>
                      <Icon name={name} />
                    </SlideFade>
                  </Box>
                ))}
                <Box as={ChakraLink} href={`mailto:${email}`}>
                  <SlideFade in={social} reverse={!social} offsetY={-20}>
                    <ChakraIcon as={IoMailOutline} w={6} h={6} />
                  </SlideFade>
                </Box>
              </Flex>
            </Flex>
          )
        ) : (
          <>
            <Flex
              flex={{ base: 1, lg: 'auto' }}
              display={{ base: 'flex', lg: 'none' }}>
              <SlideFade in={!social} reverse={social} offsetY={20}>
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
            <Link href={'/'}>
              <Box
                as={'a'}
                w={100}
                cursor='pointer'
                _hover={{
                  textDecoration: 'none',
                }}>
                <Icon name={'Logo'} />
              </Box>
            </Link>
            <Flex display={{ base: 'none', lg: 'flex' }} ml={10} py={5}>
              <Stack direction={'row'} spacing={10} align='center'>
                {navItems.map((navItem) => (
                  <DesktopNav navItem={navItem} key={navItem.name} />
                ))}
                <IconButton onClick={toggleColorMode} mx='2'>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </IconButton>
              </Stack>
            </Flex>
          </>
        )}
        <Flex
          flex={{ base: 1, lg: 'auto' }}
          justifyContent={'flex-end'}
          display={{ base: 'flex', lg: 'none' }}>
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
          display={{ lg: 'none' }}
          align={'center'}>
          {navItems.map((navItem) => (
            <MobileNav
              key={navItem.name}
              navItem={navItem}
              onToggle={onToggle}
            />
          ))}
          <Stack spacing={4}>
            <Flex
              justify={'center'}
              align={'center'}
              _hover={{
                textDecoration: 'none',
              }}>
              <Button w={'50%'} onClick={toggleColorMode} mx='2'>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
};

const DesktopNav = ({ navItem }) => {
  const router = useRouter();
  return (
    <Box>
      <Popover trigger={'hover'} placement={'bottom-start'}>
        <PopoverTrigger>
          <Link href={navItem.url ?? '#'}>
            <Box as={'a'}>
              <Button
                p={2}
                fontSize={'lg'}
                fontWeight={500}
                bg={'none'}
                rounded={'none'}
                color={useColorModeValue('gray.600', 'gray.200')}
                _hover={{
                  textDecoration: 'none',
                  color: '#48BB78',
                }}
                _focus={{
                  outline: 'none',
                }}
                borderBottom={
                  router.asPath.includes(navItem.name.toLowerCase()) && '2px'
                }
                borderColor={'#48BB78'}>
                {navItem.name}
              </Button>
            </Box>
          </Link>
        </PopoverTrigger>
      </Popover>
    </Box>
  );
};

const MobileNav = ({ navItem, onToggle }) => {
  return (
    <Stack spacing={4} onClick={onToggle}>
      <Link href={navItem.url ?? '#'}>
        <Flex
          py={2}
          as={'a'}
          justify={'center'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {navItem.name}
          </Text>
        </Flex>
      </Link>
    </Stack>
  );
};

export default Navbar;
