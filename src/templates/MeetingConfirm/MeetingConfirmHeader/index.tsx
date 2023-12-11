import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { FlexVertical } from '../../../components/styled';
import { useMeeting } from '../../../hooks/useMeeting';

const MeetingConfirmHeader = () => {
  const { meeting } = useMeeting();

  return (
    <>
      <FlexVertical flex={1} alignItems={'center'} gap={1}>
        <FlexVertical flex={1} gap={1} width={'100%'}>
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={1}
          >
            <Typography variant="h5" fontWeight={700}>
              {meeting?.name}
            </Typography>
          </Box>
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
