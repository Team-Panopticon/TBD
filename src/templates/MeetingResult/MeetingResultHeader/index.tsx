import { Typography } from '@mui/material';

import { HifiveIcon } from '../../../components/IconComponent/HiFive';
import { Header, HeaderContainer } from '../../../components/pageLayout';
import { FlexVertical } from '../../../components/styled';
import { useMeetingResultHeader } from '../../../hooks/MeetingResult/useMeetingResultHeader';
import { getMealLabel } from '../../../utils/getMealLabel';

const MeetingResultHeader = () => {
  const { meeting, meetingDate, meetingMeal } = useMeetingResultHeader();

  return (
    <Header>
      <HeaderContainer>
        <FlexVertical flex={1} alignItems={'center'} gap={1}>
          <FlexVertical flex={1} gap={1}>
            <Typography variant="h5" fontWeight={700} alignSelf={'center'}>
              축하합니다!
            </Typography>
            <FlexVertical alignItems={'center'}>
              <HifiveIcon width={100} height={100}></HifiveIcon>
            </FlexVertical>
            <Typography variant="h5" fontWeight={300} align="center">
              <Typography variant="body1" fontWeight={700} align="center">
                {meeting?.name && `${meeting?.name}`}{' '}
                <span style={{ fontWeight: 'normal' }}>의</span>
              </Typography>
              <Typography variant="body1" fontWeight={600} align="center">
                날짜가 정해졌어요
              </Typography>
            </Typography>
          </FlexVertical>
          <FlexVertical>
            <Typography variant="h2" color={'primary'} fontWeight={500} align="center">
              {meetingDate?.format('M/DD')} {getMealLabel(meetingMeal)}
            </Typography>
            <Typography variant="h5" color={'primary'} align="center">
              {`[${meetingDate?.format('dddd') || ''}]`}
            </Typography>
          </FlexVertical>
        </FlexVertical>
      </HeaderContainer>
    </Header>
  );
};

export default MeetingResultHeader;
