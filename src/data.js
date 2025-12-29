import { Text, useColorModeValue, Link, Code } from '@chakra-ui/react';

export const SummaryText = () => {
  return (
    <Text
      pr={{ base: 0, md: 16 }}
      mb={4}
      fontSize={{ base: 'md', md: 'lg' }}
      color={useColorModeValue('brand.600', 'gray.400')}
      letterSpacing='wider'>
      I'm a software engineer who specializes in building and designing
      exceptional digital experiences. I work at{' '}
      <Link
        href='https://ajackus.com/'
        target='_blank'
        px={1}
        textDecoration={'none'}
        borderBottom={'.125em solid #27a9e1'}
        boxShadow={'inset 0 -0.125em 0 #27a9e1'}
        transition={
          'box-shadow 270ms cubic-bezier(0.77, 0, 0.175, 1), color 270ms cubic-bezier(0.77, 0, 0.175, 1)'
        }
        _hover={{
          color: 'white',
          boxShadow: 'inset 0 -1.125em 0 #27a9e1',
        }}
        _focus={{
          outline: 'none',
          background: '#27a9e1',
          color: '#fff',
          boxShadow: '8px 8px 24px rgba(0, 0, 0, 0.2)',
        }}>
        Ajackus
      </Link>{' '}
      as a Technical Lead Manager.
      <br />
      <br />
      I now lead a dynamic team of 10+ ServiceNow developers. My journey in
      software engineering has equipped me with the versatility to navigate
      various tech stacks and lead teams to success. With a passion for
      innovation and problem-solving, I thrive in fast-paced environments,
      leveraging my expertise to streamline processes and drive impactful
      solutions.
      <br />
      <br />I normally code in <Code colorScheme='red'>Angular</Code>,{' '}
      <Code colorScheme='purple'>TypeScript</Code>,{' '}
      <Code colorScheme='blue'>Java</Code> and{' '}
      <Code colorScheme='green'>Spring</Code> but I love to learn other
      programming languages to write programs in as well. In the past years,
      I’ve also had the opportunity to code in{' '}
      <Code colorScheme='red'>PHP</Code>, <Code colorScheme='blue'>C#</Code>,{' '}
      <Code colorScheme='green'>Java</Code>,{' '}
      <Code colorScheme='purple'>Python</Code>, and other languages.
      <br />
      <br />I also like to write frontend applications using{' '}
      <Code colorScheme='purple'>React</Code>,{' '}
      <Code colorScheme='blue'>Next.js</Code>,{' '}
      <Code colorScheme='pink'>SASS</Code>, or just{' '}
      <Code colorScheme='green'>Vanilla JS</Code> and{' '}
      <Code colorScheme='blue'>CSS</Code>.
    </Text>
  );
};

export const experienceData = [
  {
    name: 'Ajackus Consultancy',
    years: 'September 2020 - Ongoing',
    position: 'Technical Lead Manager',
    type: 'Full time',
    place: 'Mumbai, India',
    points: [
      'Collaborate with cross-functional teams to align technical solutions with business needs, ensuring high client satisfaction and solution relevance.',
      'Spearheaded continuous improvement initiatives, promoting best practices and new technologies to optimize project execution and outcomes.',
      'Acted as a primary point of contact for clients, fostering strong relationships and effectively communicating project requirements, timelines, and deliverables between clients and the development team.',
      'Developed and deployed full-stack web applications from the ground up, significantly enhancing system efficiency and user experience.',
      'Authored robust backend solutions for API services and complex modules, reducing processing time by 90%, implemented automated testing using GitHub Actions, and secured applications with AWS Amplify and AWS Cognito.',
    ],
  },
  {
    name: 'Tribus Non-Governmental Organisation',
    years: 'October 2019 - March 2020',
    position: 'Web Developer',
    type: 'Volunteer',
    place: 'Pune, India',
    points: [
      'Implemented and deployed a website for a non-governmental organization using HTML, CSS, JavaScript, and Google Cloud Services.',
      'Applied GIT to track, test, and update pre-existing source code.',
      'Managed the website on a weekly basis.',
    ],
  },
  {
    name: 'IMTAC',
    years: 'December 2018 - June 2019',
    position: '.NET Developer',
    type: 'Internship',
    place: 'Muscat, Oman',
    points: [
      'Designed and implemented a multi-tier software application using ASP.NET, C#, HTML/CSS, jQuery, and SQL Server.',
      'Participated in a full software development life cycle from scoping, analysis, design, and implementation to meet client needs.',
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
    href: 'https://bhabpm.com/',
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
    href: 'https://dashboard.safetravelbarometer.com/',
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
      { name: 'Next.js', color: 'yellow' },
      { name: 'Javascript', color: 'green' },
      { name: 'HTML/CSS', color: 'purple' },
      { name: 'SASS', color: 'blue' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', color: 'teal' },
      { name: 'Laravel', color: 'orange' },
      { name: 'ASP.NET', color: 'pink' },
      { name: 'C#', color: 'red' },
      { name: 'Java', color: 'cyan' },
      { name: 'Spring', color: 'green' },
    ],
  },
  {
    category: 'Database / CMS',
    items: [
      { name: 'PostgreSQL', color: 'purple' },
      { name: 'Strapi', color: 'blue' },
      { name: 'MongoDB', color: 'green' },
      { name: 'MS SQL Server', color: 'teal' },
      { name: 'MySQL', color: 'yellow' },
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
