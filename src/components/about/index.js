import { Box } from '@chakra-ui/layout';
import Technologies from './technologies';
import Summary from './summary';
import Statistics from './statistics';
import Footer from '../footer';
import { SlideFade } from '@chakra-ui/react';
import Testimonials from './testimonials';

const Main = () => {
  return (
    <SlideFade in={true} offsetY='100px'>
      <Box px={{ base: 10, md: 14, lg: 60 }} my={10} w={'auto'}>
        <Summary />
        <Technologies />
        <Statistics />
        <Testimonials />
        <Footer />
      </Box>
    </SlideFade>
  );
};

export default Main;
