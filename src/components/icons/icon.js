import React from 'react';
import {
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconTwitter,
  Logo,
} from '@/components/icons';

const Icon = ({ name }) => {
  switch (name) {
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Twitter':
      return <IconTwitter />;
    case 'Logo':
      return <Logo />;
    default:
      return '';
  }
};

export default Icon;
