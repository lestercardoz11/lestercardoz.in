import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const StarryNight = () => {
  const isDark = useColorModeValue(false, true);

  // Generate random stars using CSS
  const generateStars = (count, size) => {
    let stars = '';
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      stars += `${x}vw ${y}vh ${size}px ${size}px rgba(255, 255, 255, ${
        Math.random() * 0.8 + 0.2
      })`;
      if (i < count - 1) stars += ',';
    }
    return stars;
  };

  return (
    <>
      <Box
        position='fixed'
        top={0}
        left={0}
        width='100%'
        height='100%'
        zIndex={-1}
        pointerEvents='none'
        overflow='hidden'
        bg={useColorModeValue('white', 'gray.900')}>
        {/* Layer 1: Tiny stars - fast movement */}
        <Box
          position='absolute'
          width='1px'
          height='1px'
          sx={{
            boxShadow: generateStars(500, 0.5),
            animation: 'animateStars 200s linear infinite',
            opacity: isDark ? 1 : 0.3,
            '@keyframes animateStars': {
              '0%': {
                transform: 'translateY(0)',
              },
              '50%': {
                transform: 'translateY(-10vh)',
              },
              '100%': {
                transform: 'translateY(0)',
              },
            },
          }}
        />

        {/* Layer 2: Small stars - medium movement */}
        <Box
          position='absolute'
          width='2px'
          height='2px'
          sx={{
            boxShadow: generateStars(100, 1),
            animation: 'animateStars 200s linear infinite',
            opacity: isDark ? 0.9 : 0.25,
            '@keyframes animateStars': {
              '0%': {
                transform: 'translateY(0)',
              },
              '50%': {
                transform: 'translateY(10vh)',
              },
              '100%': {
                transform: 'translateY(0)',
              },
            },
          }}
        />

        {/* Twinkling layer */}
        <Box
          position='absolute'
          width='100%'
          height='100%'
          sx={{
            background: isDark
              ? `radial-gradient(ellipse at top, rgba(255, 255, 255, 0.02) 0%, transparent 40%),
                 radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0.02) 0%, transparent 40%)`
              : `radial-gradient(ellipse at top, rgba(0, 0, 0, 0.01) 0%, transparent 40%),
                 radial-gradient(ellipse at bottom, rgba(0, 0, 0, 0.01) 0%, transparent 40%)`,
            animation: 'twinkle 4s ease-in-out infinite',
            '@keyframes twinkle': {
              '0%, 100%': {
                opacity: 0.5,
              },
              '50%': {
                opacity: 1,
              },
            },
          }}
        />
      </Box>

      <style jsx global>{`
        @keyframes animateStars {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100vh);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default StarryNight;
