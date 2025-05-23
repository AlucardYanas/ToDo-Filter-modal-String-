import { Box, Container } from '@chakra-ui/react';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container
        maxW="1000px"
        maxH="1000px"
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        p={8}
        position="relative"
        overflow="hidden"
      >
        <Box fontSize="6xl" color="pink.100" mb={8} textAlign="center">
          todos
        </Box>
        <Box maxW="100%" overflow="auto" h="calc(100% - 120px)">
          {children}
        </Box>
      </Container>
    </Box>
  );
}
