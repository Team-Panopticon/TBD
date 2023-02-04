import { ToggleButton } from '@mui/material';
import { useRecoilState } from 'recoil';

import { MeetingType } from '../../constants/meeting';
import { createMeetingState } from '../../stores/createMeeting';
import { customButtonStyle, CustomTogglebuttonGroup } from './styled';

export function SelectMeetingType() {
  const [meeting, setMeeting] = useRecoilState(createMeetingState);

  const onChange = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;
    const meetingValue = parseInt(target.value);

    if (meetingValue in MeetingType) {
      setMeeting({
        ...meeting,
        type: meetingValue,
      });
    }
  };

  return (
    <CustomTogglebuttonGroup
      onChange={onChange}
      color="primary"
      exclusive
      value={meeting.type}
      fullWidth
    >
      <ToggleButton style={customButtonStyle} value={MeetingType.date}>
        날짜만
      </ToggleButton>
      <ToggleButton style={customButtonStyle} value={MeetingType.meal}>
        점심/저녁
      </ToggleButton>
    </CustomTogglebuttonGroup>
  );
}
