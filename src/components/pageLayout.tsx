import { styled } from '@mui/material';
import { ReactNode } from 'react';

export const Page = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100vh;
  overflow: hidden;
`;

export const Header = styled('header')`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 144px;
  flex: 0;
`;

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

  h2: {
    marginTop: '4px',
  },
});

const ContentsWrapper = styled('div')`
  overflow: auto;
  padding: 16px 32px;
  height: 100%;
`;
const ContentsBox = styled('div')`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  overflow-y: auto;
`;
export const Contents = ({ children }: { children: ReactNode }) => {
  return (
    <ContentsWrapper>
      <ContentsBox>{children}</ContentsBox>
    </ContentsWrapper>
  );
};

export const Footer = styled('footer')({
  height: '56px',
  flexShrink: 0,
});
