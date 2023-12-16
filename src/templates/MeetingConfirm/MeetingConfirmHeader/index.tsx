import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Typography from '@mui/material/Typography';

import { FlexVertical } from '../../../components/styled';

const MeetingConfirmHeader = () => {
  return (
    <>
      <FlexVertical flex={1} alignItems={'center'} gap={1}>
        <FlexVertical flex={1} gap={1} width={'100%'}>
          <FlexVertical alignItems={'center'}>
            <EventAvailableIcon sx={{ fontSize: 110 }} />
          </FlexVertical>
          <Typography variant="h6" fontWeight={400} align="center">
            모임시간을 골라서 확정해주세요
          </Typography>
        </FlexVertical>
      </FlexVertical>
    </>
  );
};

export default MeetingConfirmHeader;
