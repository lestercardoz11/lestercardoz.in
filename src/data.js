import { Text, useColorModeValue, Link, Code } from '@chakra-ui/react';

export const SummaryText = () => {
  return (
    <Text
      pr={{ base: 0, md: 16 }}
      mb={4}
      fontSize={{ base: 'md', md: 'lg' }}
      color={useColorModeValue('brand.600', 'gray.400')}
      letterSpacing='wider'>
      I’m a <strong>Technical Lead Manager</strong> and
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
      I’m driven by building products that
      <strong> solve real problems</strong>, growing people into confident
      owners, and creating teams that consistently deliver value in fast-moving,
      high-stakes environments.
    </Text>
  );
};

export const experienceData = [
  {
    name: 'Ajackus Consultancy LLP',
    years: 'September 2020 - Present',
    position: 'Technical Lead Manager',
    type: 'Full time',
    place: 'Mumbai, India',
    points: [
      'Lead 15+ developers across 20+ concurrent projects spanning ServiceNow, full-stack web, and enterprise platforms.',
      'Act as technical liaison between clients, sales, and engineering teams, translating business requirements into technical solutions with 95% client satisfaction.',
      'Architect ServiceNow implementations across ITSM, ITOM, SecOps, GRC, IRM, and custom scoped applications.',
      'Partner with sales and leadership on pre-sales, solution architecture, POCs, and proposals, contributing to 60% growth in new contracts.',
      'Established technical interview processes and conducted 50+ assessments to build high-performing teams.',
    ],
  },
  {
    name: 'Ajackus Consultancy LLP',
    years: 'July 2023 - July 2024',
    position: 'Senior Software Engineer',
    type: 'Full time',
    place: 'Mumbai, India',
    points: [
      'Managed full-stack applications using Angular, Spring Boot, AWS, and PostgreSQL processing 10,000+ daily transactions.',
      'Led ServiceNow delivery across multiple enterprise modules with on-time, zero-escalation releases.',
      'Integrated SSO across Azure AD and AWS Cognito, reducing authentication issues by 75%.',
      'Implemented structured code review practices reducing production defects by 25%.',
    ],
  },
  {
    name: 'Ajackus Consultancy LLP',
    years: 'March 2022 - July 2023',
    position: 'Software Engineer',
    type: 'Full time',
    place: 'Mumbai, India',
    points: [
      'Co-developed Tacnique from prototype to revenue-generating platform using Next.js and Airtable.',
      'Designed scalable backend APIs and complex processing modules, reducing execution time by 90%.',
      'Built dynamic data-driven UIs with charts, analytics, and visualizations.',
    ],
  },
  {
    name: 'IMTAC LLC',
    years: 'December 2018 - June 2019',
    position: '.NET Developer Intern',
    type: 'Internship',
    place: 'Muscat, Oman',
    points: [
      'Developed a housing management system from scratch using C#, ASP.NET, and Microsoft SQL Server.',
      'Worked across the full SDLC including analysis, development, testing, and deployment.',
    ],
  },
];

export const featuredProjectsData = [
  {
    title: 'Opex Genie',
    href: 'https://www.opexgenie.com/',
    languages: ['spring boot', 'angular', 'postgreSQL', 'aws'],
    points: [
      'Developed the user interface consisting of multiple pages, data analysis, file uploads/downloads, and charts.',
      'Built backend APIs for bill analysis, bill extraction, file ingestion, and logical calculations.',
      'Created and automated frontend and backend tests using GitHub Actions.',
    ],
  },
  {
    title: 'Tachnique',
    href: 'https://tacnique.com/',
    languages: ['next.js', 'airtable api', 'tailwindcss'],
    points: [
      'HR platform designed to handle hiring workflows and candidate communication.',
      'Developed clean, responsive frontend UI from scratch using Next.js and Airtable API.',
    ],
  },
  {
    title: 'Bangladesh Prime Minister',
    href: '',
    languages: ['next.js', 'strapi'],
    points: [
      'Educational platform for children of Bangladesh including stories, games, quizzes, and rewards.',
      'Developed responsive frontend UI using Next.js and Strapi CMS.',
    ],
  },
  {
    title: 'Property Capsule',
    href: 'https://www.propertycapsule.com/',
    languages: ['freemarker', 'html', 'css'],
    points: [
      'Cloud-based platform to manage and present property portfolios for a US company (VTS).',
      'Migrated multiple websites from PHP to Freemarker.',
    ],
  },
  {
    title: 'Safe Travel Barometer',
    href: '',
    languages: [
      'laravel',
      'laravel backpack',
      'php',
      'next.js',
      'postgreSQL',
      'graphQL',
    ],
    points: [
      'World’s most comprehensive B2B solution for COVID-19 health & safety protocols.',
      'Developed backend and frontend features using Laravel, Laravel Backpack, PHP, and Next.js.',
    ],
  },
  {
    title:
      'Bearing Fault Detection Using Comparative Analysis of Random Forest, ANN, and Autoencoder Methods',
    href: 'https://link.springer.com/chapter/10.1007/978-981-16-1089-9_14',
    languages: ['machine learning', 'python', 'jupyter notebook'],
    points: [
      'Reduced execution time wastage and annual expenditure loss caused by missed alarms.',
      'Evaluated Random Forest, ANN, and Autoencoder models for bearing fault diagnosis.',
    ],
  },
];

export const technologiesData = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', color: 'red' },
      { name: 'Angular', color: 'pink' },
      { name: 'Next.js', color: 'blue' },
      { name: 'TypeScript', color: 'purple' },
      { name: 'JavaScript', color: 'yellow' },
      { name: 'TailwindCSS / SASS', color: 'teal' },
    ],
  },
  {
    category: 'Backend & Architecture',
    items: [
      { name: 'Node.js', color: 'green' },
      { name: 'Spring Boot', color: 'cyan' },
      { name: 'GraphQL', color: 'purple' },
      { name: 'REST APIs', color: 'orange' },
      { name: 'Microservices', color: 'blue' },
    ],
  },
  {
    category: 'Database & Cloud',
    items: [
      { name: 'PostgreSQL', color: 'purple' },
      { name: 'MongoDB', color: 'green' },
      { name: 'MySQL', color: 'yellow' },
      { name: 'AWS (Amplify, Cognito)', color: 'orange' },
      { name: 'CI/CD (GitHub Actions)', color: 'teal' },
    ],
  },
  {
    category: 'ServiceNow',
    items: [
      { name: 'ITSM', color: 'blue' },
      { name: 'ITOM', color: 'green' },
      { name: 'SecOps', color: 'red' },
      { name: 'GRC / IRM', color: 'purple' },
      { name: 'Custom Applications', color: 'orange' },
    ],
  },
];

// data.js
export const testimonialsData = [
  {
    company: 'Ajackus',
    companyLogo: '/images/ajackus-icon-blue.svg',
    quote:
      'Lester has been an exceptional leader for our ServiceNow division, which has been achieving remarkable growth of 100% quarter-over-quarter. Even with such explosive expansion, last quarter saw the fewest escalations since the division`s inception in mid-2023-a testament to his effective leadership. Leading a young team while managing numerous projects is no small feat, especially for someone who stepped into a managerial role just a year ago. Yet, Lester handles it all with impressive composure, making it seem effortless. His ability to balance team coaching, project delivery, and growth management is truly commendable and has been instrumental to the division`s success.',
    name: 'Maulik Bengali',
    role: 'Founder & CEO',
    date: 'January 2025',
    avatar: '',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7288582293361741824/',
  },
  {
    company: 'Ajackus',
    companyLogo: '/images/ajackus-icon-blue.svg',
    quote:
      'Lester has been doing great work leading our ServiceNow division from the technical front. With the new year, we had new challenges to deal with. But, he embraces each challenge with a distinctive calm and composure almost unseen in a budding leader. He is taking a three-pronged approach to upskilling: being hands-on with the team, taking up challenging work, and getting certified. His efforts and commitment are remarkable and bound to bring him and the organization long-term success.',
    name: 'Maulik Bengali',
    role: 'Founder & CEO',
    date: 'April 2024',
    avatar: '',
  },
  {
    company: 'Ajackus',
    companyLogo: '/images/ajackus-icon-blue.svg',
    quote:
      'Last quarter, Lester took charge of the technical side of the ServiceNow division, a crucial strategic initiative for our organization. He has demonstrated remarkable commitment and flexibility by immersing himself in this unfamiliar ecosystem from scratch. His continuous efforts to upgrade his knowledge and expertise in the field are impressive and commendable. Furthermore, He helps his team members make the most of software development life cycle (SDLC) best practices, enabling an environment of growth and excellence.',
    name: 'Maulik Bengali',
    role: 'Founder & CEO',
    date: 'October 2023',
    avatar: '',
  },
  {
    company: 'Ajackus',
    companyLogo: '/images/ajackus-icon-blue.svg',
    quote:
      'Lester has been a consistent support system for the OpexGenie team for over two years. Lately, Lester has been deploying his knowledge on product to help the business as well. As part of its offering, the product ingests large telecom bills. There were some additional requirements for enterprise clients. The product team was exploring possible solutions. Lester was able to come up with a smart business solution which involved a minor addition to the existing features and that saved lot of time for everyone. Lester showed how engineers can create much larger impact when they go beyond the role and connect with a product.',
    name: 'Maulik Bengali',
    role: 'Founder & CEO',
    date: 'July 2023',
    avatar: '',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7088101101337518080/',
  },
];
