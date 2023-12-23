import Typography from '@mui/material/Typography';

import { FlexVertical } from '../../../components/styled';
import { useMeetingViewHeader } from '../../../hooks/MeetingView/useMeetingViewHeader';
import GreetingHands from '../../../images/greeting-hands.png';
import { PrimaryBold } from '../styled';

const MeetingViewHeader = () => {
  const { currentUser } = useMeetingViewHeader();

  return (
    <>
      <>
        <FlexVertical flex={0} alignItems={'center'} gap={1}>
          <FlexVertical flex={1} gap={1} width={'100%'}>
            <FlexVertical alignItems={'center'}>
              <img height={110} src={GreetingHands} alt="" />
            </FlexVertical>
            {currentUser ? (
              <Typography variant="h5" fontWeight={500} align="center">
                <PrimaryBold className="primary-bold">{currentUser.username}</PrimaryBold>님
                안녕하세요
              </Typography>
            ) : null}
          </FlexVertical>
        </FlexVertical>
      </>
    </>
  );
};

export default MeetingViewHeader;
