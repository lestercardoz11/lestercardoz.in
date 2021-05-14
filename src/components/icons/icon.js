import React from 'react';
import {
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconTwitter,
  IconShare,
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
    default:
      return '';
  }
};

export default Icon;
