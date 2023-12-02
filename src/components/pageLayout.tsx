import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import logo_nobg from '../assets/round.png';
export const Page = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: auto;
  flex: 1;
  height: 100%;
`;

const HeaderWrapper = styled('header')`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 0;
`;

const HeaderContainer = styled('div')`
  width: 100%;
  height: 64px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  h1: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: '700',
  },

  h2: {
    marginTop: '4px',
  },
`;

export const HeaderBox = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  gap: '8px',
  padding: '0 32px 32px',
});

const MenuIconButton = styled(MenuIcon)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.secondary.dark,
  color: theme.palette.secondary.dark,
  borderRadius: '6px',
  padding: '4px',
  width: '32px',
  height: '32px',
}));

export const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <MenuIconButton></MenuIconButton>
        <img
          src={logo_nobg}
          alt="로고"
          style={{
            width: 'auto',
            height: '32px',
          }}
        />
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export const EditHeaderBox = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  gap: '8px',
  padding: '0 0px 32px',
});

export const EditTemplateHeader = ({ children }: { children: ReactNode }) => {
  return (
    <HeaderWrapper>
      <EditHeaderBox>{children}</EditHeaderBox>
    </HeaderWrapper>
  );
};
const ContentsWrapper = styled(Box)`
  padding: 16px 32px;
  height: 100%;
  display: flex;
`;
const ContentsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  he
`;

export const Footer = styled('footer')({
  backgroundColor: 'white',
  position: 'sticky',
  bottom: 0,
  width: '100%',
  height: '64px',
  flexShrink: 0,
  padding: '8px 0px',
});

export const PageLayout = ({ useHeader = true }: { useHeader?: boolean }) => {
  return (
    <div style={{ height: 'calc(var(--vh, 1vh)*100 )' }}>
      {useHeader && <Header></Header>}
      <ContentsWrapper>
        <ContentsBox>
          <Outlet />
        </ContentsBox>
      </ContentsWrapper>
    </div>
  );
};
