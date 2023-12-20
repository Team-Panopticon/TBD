import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import calendarImage from '../../assets/calendar.png';
import diningImage from '../../assets/dining.png';
import shareImage from '../../assets/share.png';
import voteImage from '../../assets/vote.png';
import HowToStep from '../../components/HowToStep';
import { Footer, Header, Page } from '../../components/pageLayout';
import { FullHeightButtonGroup } from '../../components/styled';
import { AnimatedTypography } from '../../templates/MeetingEdit/styled';
import {
  HowToContainer,
  MainImageContainer,
  WelcomeContents,
  WelcomeHeaderContainer,
} from './styled';

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
        <HowToContainer>
          <HowToStep
            image={calendarImage}
            text={'투표할 날짜를 골라서 모임을 만들어보세요'}
            textUnderline
          />
          <HowToStep
            image={voteImage}
            text={'참석 가능한 날짜를 선택해서 투표하세요'}
            textUnderline
          />
          <HowToStep image={shareImage} text={'카카오톡으로 투표 링크를 공유해보세요'} />
        </HowToContainer>
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
