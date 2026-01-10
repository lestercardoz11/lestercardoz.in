import {
  Box,
  Flex,
  Icon,
  Divider,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react';

export const StatCard = (props) => {
  const { title, tech, icon, color, stat, isLoading } = props;

  return (
    <Skeleton isLoaded={!isLoading}>
      <Box
        px={2}
        bg={useColorModeValue('gray.100', 'gray.900')}
        color={useColorModeValue('gray.600', 'gray.400')}
        shadow={'md'}
        rounded={'lg'}>
        <Box p={2} w={'full'}>
          <Flex
            direction={'row'}
            p={2}
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight={'medium'}>
            <Box w={'35%'}>
              <Flex
                w={14}
                h={14}
                bg={`${color}.500`}
                rounded={'full'}
                justify={'center'}
                align={'center'}>
                <Icon as={icon} w={6} h={6} color='white' />
              </Flex>
            </Box>
            <Flex direction={'column'} w={'65%'}>
              <Box textAlign={'end'} fontSize={'sm'} letterSpacing={'wider'}>
                {title}
              </Box>
              <Box
                textAlign={'end'}
                fontSize={'3xl'}
                color={useColorModeValue('gray.800', 'white')}>
                {stat}
              </Box>
            </Flex>
          </Flex>
          <Divider py={1} />
          <Box
            p={2}
            fontSize={'sm'}
            fontWeight={'medium'}
            letterSpacing={'widest'}
            textTransform={'uppercase'}>
            {tech}
          </Box>
        </Box>
      </Box>
    </Skeleton>
  );
};

export default StatCard;
