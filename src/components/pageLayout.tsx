import { styled } from '@mui/material';

export const Page = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  height: '100vh',
});

export const Header = styled('header')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  height: '144px',
  flex: 0,
});

export const HeaderContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  gap: '8px',
  padding: '32px',

  h1: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: '700',
  },
});

export const Contents = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  flexGrow: 1,
  overflowY: 'auto',
});

export const Footer = styled('footer')({
  height: '56px',
  flexShrink: 0,
});
