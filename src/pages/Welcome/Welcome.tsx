import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import diningImage from '../../assets/dining.png';
import { Footer, Header, Page } from '../../components/pageLayout';
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
      <WelcomeContents>
        <MainImageContainer>
          <Typography
            variant="h4"
            fontWeight={500}
            align="center"
            color={'#FFFFFF'}
            marginTop={'24px'}
          >
            손쉽게 모임시간을
            <br />
            정해보세요
          </Typography>
          <img src={diningImage} style={{ width: '100%' }} />
        </MainImageContainer>
      </WelcomeContents>
      <Footer>
        <FullHeightButtonGroup fullWidth disableElevation variant="contained">
          <Button onClick={handleClick}>{'모임 만들기'}</Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}

export default Welcome;
