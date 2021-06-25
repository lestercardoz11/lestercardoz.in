import { Box } from '@chakra-ui/layout';
import AllProjects from './all-projects';
import Experience from './experience';
import FeaturedProjects from './featured-projects';

const Main = () => {
  return (
    <Box mx={60} my={10} w={'auto'}>
      <Experience />
      <FeaturedProjects />
      <AllProjects />
    </Box>
  );
};

export default Main;
