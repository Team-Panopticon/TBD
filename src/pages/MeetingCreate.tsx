import { InputLabel, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useRecoilState } from 'recoil';

import { DateInput } from '../components/DateInput';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { createMeetingState } from '../stores/createMeeting';
import { SelectDates } from '../templates/MeetingCreate/SelectDates';
import { SelectMeetingType } from '../templates/MeetingCreate/SelectMeetingType';
import { InputContainer } from '../templates/MeetingCreate/styled';

export function MeetingCreate() {
  const [meeting, setMeeting] = useRecoilState(createMeetingState);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeeting({
      ...meeting,
      name: event.target.value,
    });
  };

  const handleDeadlineChange = (deadline: string) => {
    setMeeting({
      ...meeting,
      deadline,
    });
  };

  const onRemoveDate = (targetDate: Dayjs) => {
    setMeeting({
      ...meeting,
      dates: meeting.dates.filter((date) => !date.isSame(targetDate)),
    });
  };
  const onAddDate = (targetDate: Dayjs) => {
    setMeeting({
      ...meeting,
      dates: meeting.dates.concat(targetDate),
    });
  };

  return (
    <Page>
      <Header>
        <HeaderContainer>
          <div style={{ backgroundColor: 'aquamarine' }}>progress bar area</div>
          {/* TOdo: Replace font size with theme properties */}
          <Typography variant="h1" style={{ fontSize: 24, textAlign: 'center' }}>
            모임의 이름이 무엇인가요?
          </Typography>
        </HeaderContainer>
      </Header>
      <Contents>
        <InputContainer>
          <div>
            <InputLabel htmlFor="name" shrink>
              모임 이름
            </InputLabel>
            <TextField
              id="name"
              hiddenLabel
              size="small"
              variant="outlined"
              fullWidth
              placeholder="한사랑산악회 신년 모임"
              onChange={handleNameChange}
            />
          </div>
          <div>
            <InputLabel htmlFor="deadline" shrink>
              투표 기한
            </InputLabel>
            <DateInput
              selectedDate={meeting.deadline}
              onChange={handleDeadlineChange}
              minDate={dayjs()}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <div>
            <InputLabel htmlFor="name" shrink>
              투표 종류
            </InputLabel>
            <SelectMeetingType />
          </div>
        </InputContainer>
        <InputContainer>
          <div>
            <InputLabel htmlFor="name" shrink>
              투표 대상 날짜
            </InputLabel>
            <SelectDates dates={meeting.dates} onAddDate={onAddDate} onRemoveDate={onRemoveDate} />
          </div>
        </InputContainer>
      </Contents>
      <Footer>Footer Area</Footer>
    </Page>
  );
}
