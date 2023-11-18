import ToggleButton from '@mui/material/ToggleButton';

import { MeetingType } from '../../constants/meeting';
import { CustomTogglebuttonGroup, getCustomButtonStyle } from './styled';

interface Props {
  value: MeetingType;
  onChange: (date: MeetingType) => void;
}

export function SelectMeetingType({ value, onChange }: Props) {
  const onClickToggleButton = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;
    const meetingValue = target.value as MeetingType;
    onChange(meetingValue);
  };

  return (
    <CustomTogglebuttonGroup
      onChange={onClickToggleButton}
      color="primary"
      exclusive
      value={value}
      fullWidth
    >
      <ToggleButton
        style={getCustomButtonStyle(value === MeetingType.date)}
        value={MeetingType.date}
      >
        날짜만
      </ToggleButton>
      <ToggleButton
        style={getCustomButtonStyle(value === MeetingType.meal)}
        value={MeetingType.meal}
      >
        점심/저녁
      </ToggleButton>
    </CustomTogglebuttonGroup>
  );
}
