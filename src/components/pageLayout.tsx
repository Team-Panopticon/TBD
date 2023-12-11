import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';

export const Page = styled('div')`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: scroll;
  padding: 0 32px;
  width: 100vw;
  margin-left: -32px;
  padding-bottom: 64px;
`;

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
  bottom: 0,
});

export const PageLayout = (props: { useHeader?: boolean }) => {
  const { useHeader = true } = props;
  return (
    <div style={{ height: 'calc(var(--vh, 1vh)*100 )', overflow: 'hidden', position: 'relative' }}>
      {useHeader && <Header></Header>}
      <ContentsWrapper>
        <ContentsBox {...props}>
          <Outlet />
        </ContentsBox>
      </ContentsWrapper>
    </div>
  );
};
