import { Box } from '@chakra-ui/layout';
import Technologies from './technologies';
import Summary from './summary';

const Main = () => {
  return (
    <Box mx={60} my={10} w={'auto'}>
      <Summary />
      <Technologies />
    </Box>
  );
};

export default Main;
