import styled from 'styled-components';
import { email, socialMedia } from '@/config';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Icon } from '@/components/icons';

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${(props) => props.color ?? props.color};
  }
  li {
    &:last-of-type {
      margin-bottom: 20px;
    }
    a {
      padding: 10px;
      &:hover,
      &:focus {
        transform: translateY(-3px);
      }
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${(props) => props.color ?? props.color};
  }
  a {
    margin: 20px auto;
    padding: 10px;
    letter-spacing: 2px;
    writing-mode: vertical-rl;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: border ease 0.2s;
    &:hover,
    &:focus {
      border-color: ${(props) => props.color ?? props.color};
    }
  }
`;

const Email = () => (
  <Box
    position={'absolute'}
    bottom={0}
    right={16}
    display={{ base: 'none', md: 'flex' }}
  >
    <StyledLinkWrapper color={useColorModeValue('#1A202C', 'white')}>
      <a href={`mailto:${email}`}>{email}</a>
    </StyledLinkWrapper>
  </Box>
);

const SocialLinks = () => (
  <Box
    position={'absolute'}
    bottom={0}
    left={16}
    display={{ base: 'none', md: 'flex' }}
  >
    <StyledSocialList color={useColorModeValue('#1A202C', 'white')}>
      {socialMedia &&
        socialMedia.map(({ url, name }, i) => (
          <li key={i}>
            <a
              href={url}
              aria-label={name}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Icon name={name} />
            </a>
          </li>
        ))}
    </StyledSocialList>
  </Box>
);

const Social = () => (
  <>
    <SocialLinks />
    <Email />
  </>
);

export default Social;
