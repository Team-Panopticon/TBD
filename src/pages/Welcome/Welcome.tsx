import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { Contents, Footer, Header, Page } from '../../components/pageLayout';
import { FullHeightButtonGroup } from '../../components/styled';
import { AnimatedTypography } from '../../templates/MeetingEdit/styled';
import { MainImageContainer, WelcomeContents, WelcomeHeaderContainer } from './styled';

function Welcome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/meetings/new');
  };

  return (
    <Page>
      <Header>
        <WelcomeHeaderContainer>
          <AnimatedTypography variant="h5" fontWeight={700} align="center" color={'#FFFFFF'}>
            Motoo
          </AnimatedTypography>
        </WelcomeHeaderContainer>
      </Header>
      <Footer>
        <FullHeightButtonGroup fullWidth disableElevation variant="contained">
          <Button onClick={handleClick}>{'모임 만들기'}</Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}

export default Welcome;
