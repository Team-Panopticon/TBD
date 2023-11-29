import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

export const Page = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: calc(var(--vh, 1vh) * 100 - 56px);
  overflow: auto;
`;

const HeaderWrapper = styled('header')`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 0;
`;

const HeaderContainer = styled('div')`
  width: '100%';
  height: '64px';
  padding: '20px';
`;

const HeaderBox = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  gap: '8px',
  padding: '0 32px 32px',

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

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <HeaderWrapper>
      <HeaderContainer>로고</HeaderContainer>
      <HeaderBox>{children}</HeaderBox>
    </HeaderWrapper>
  );
};

const ContentsWrapper = styled(Box)`
  padding: 16px 32px;
  height: 100%;
`;
const ContentsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
`;
export const Contents = ({ children }: { children: ReactNode }) => {
  return (
    <ContentsWrapper>
      <ContentsBox>{children}</ContentsBox>
    </ContentsWrapper>
  );
};

export const Footer = styled('footer')({
  backgroundColor: 'white',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '56px',
  flexShrink: 0,
});
