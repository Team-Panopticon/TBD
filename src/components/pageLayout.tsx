import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import logo_nobg from '../assets/round.png';
export const Page = styled('div')`
  display: flex;
  height: 100%;
  /* background-color: green; */
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: scroll;
  padding-bottom: 64px;
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
  padding: '32px 0',
});

export const EditTemplateHeader = ({ children }: { children: ReactNode }) => {
  return (
    <HeaderWrapper>
      <EditHeaderBox>{children}</EditHeaderBox>
    </HeaderWrapper>
  );
};
const ContentsWrapper = styled(Box)`
  padding: 0 32px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ContentsBox = styled(Box)<{ useHeader?: boolean }>`
  height: ${(props) => (props.useHeader === true ? 'calc(100% - 64px)' : '100%')};
  flex: auto;
  display: flex;
  flex-direction: column;
`;

export const Footer = styled('footer')({
  backgroundColor: 'white',
  position: 'sticky',
  width: '100%',
  height: '64px',
  flexShrink: 0,
  padding: '8px 0px',
});

export const PageLayout = ({ useHeader = true }: { useHeader?: boolean }) => {
  return (
    <div style={{ height: 'calc(var(--vh, 1vh)*100 )', overflow: 'hidden', position: 'relative' }}>
      {useHeader && <Header></Header>}
      <ContentsWrapper>
        <ContentsBox useHeader>
          <Outlet />
        </ContentsBox>
      </ContentsWrapper>
    </div>
  );
};
