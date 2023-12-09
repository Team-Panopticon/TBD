import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import logo_nobg from '../assets/round.png';
import { currentMeetingStateSelector } from '../stores/currentMeeting';
export const Header = () => {
  const [setCurrentMeetingState] = useRecoilState(currentMeetingStateSelector);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <img
          src={logo_nobg}
          alt="로고"
          style={{
            width: 'auto',
            height: '32px',
          }}
        />
        <h1>{setCurrentMeetingState.name}</h1>
        <MenuIconButton></MenuIconButton>
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
const MenuIconButton = styled(MenuIcon)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.secondary.dark,
  color: theme.palette.secondary.dark,
  borderRadius: '6px',
  padding: '4px',
  width: '32px',
  height: '32px',
}));

const HeaderWrapper = styled('header')`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 0;
`;

export const HeaderBox = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  gap: '8px',
  padding: '0 32px 32px',
});
const HeaderContainer = styled('div')`
  width: 100%;
  height: 64px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
