import { Text, useColorModeValue, Link } from '@chakra-ui/react';

export const SummaryText = () => {
  return (
    <Text
      fontSize={{ base: 'md', md: 'lg' }}
      color={useColorModeValue('brand.600', 'gray.400')}
      letterSpacing='wider'>
      I'm a <strong>Technical Lead Manager</strong> and
      <strong> product-focused engineering leader</strong> at{' '}
      <Link
        href='https://ajackus.com/'
        target='_blank'
        px={1}
        textDecoration='none'
        borderBottom='.125em solid #27a9e1'
        boxShadow='inset 0 -0.125em 0 #27a9e1'>
        Ajackus
      </Link>
      , where I lead cross-functional teams of
      <strong> 15+ engineers</strong> delivering
      <strong> business-critical enterprise products</strong> across ServiceNow,
      SaaS, and cloud ecosystems.
      <br />
      <br />
      My role sits at the intersection of
      <strong>
        {' '}
        product strategy, technical execution, and client outcomes
      </strong>
      . I work closely with clients, sales, and leadership to translate
      ambiguous business problems into clear product roadmaps, scalable
      architectures, and reliable delivery plans.
      <br />
      <br />
      While I remain deeply technical, my focus today is on
      <strong> leverage and impact</strong>—building teams, systems, and
      processes that scale beyond individual contributors. I empower engineers
      to own execution while I focus on direction, quality, and long-term
      product health.
      <br />
      <br />
      I'm driven by building products that
      <strong> solve real problems</strong>, growing people into confident
      owners, and creating teams that consistently deliver value in fast-moving,
      high-stakes environments.
    </Text>
  );
};

export default SummaryText;
