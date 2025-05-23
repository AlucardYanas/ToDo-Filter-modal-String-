import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.50',
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: '1000px',
        bg: 'white',
        borderRadius: 'lg',
        boxShadow: 'xl',
        p: 8,
        position: 'relative',
      },
    },
    Button: {
      defaultProps: {
        variant: 'ghost',
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme: 'green',
        size: 'lg',
      },
    },
    Text: {
      variants: {
        title: {
          fontSize: '6xl',
          color: 'pink.100',
          mb: 8,
          textAlign: 'center',
        },
        cardTitle: {
          fontSize: 'lg',
          isTruncated: true,
        },
        cardDescription: {
          fontSize: 'sm',
          color: 'gray.500',
          isTruncated: true,
        },
      },
    },
  },
});

export default theme;
