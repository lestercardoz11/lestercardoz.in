import { Box } from '@chakra-ui/layout';
import { SlideFade } from '@chakra-ui/react';
import Footer from '../footer';
import AllProjects from './all-projects';
import Experience from './experience';
import FeaturedProjects from './featured-projects';

const Main = () => {
  return (
    <SlideFade in={true} offsetY='100px'>
      <Box px={{ base: 10, md: 14, lg: 60 }} my={10} w={'auto'}>
        <Experience />
        <FeaturedProjects />
        <AllProjects />
        <Footer />
      </Box>
    </SlideFade>
  );
};

export default Main;
