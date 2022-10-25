export const theme = {
  colors: {
    white: '#fff',
    error: 'rgba(247,18,18,0.99)',
    green: 'rgba(26,183,155,0.99)',
    purple: '#4F46E5',
  },
  shadow: '0px 14px 33px rgba(15, 72, 129, 0.1)',
  scrollBar: `&::-webkit-scrollbar {
      width: 0.1rem;
    }
    &::-webkit-scrollbar-track {
      background: '#f1f1f1';
      border-radius: 0.7rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 0.7rem;
    `,
  size: {
    xs: '480px',
    sm: '600px',
    md: '834px',
    lg: '1440px',
  },
}

export type ThemeType = typeof theme
