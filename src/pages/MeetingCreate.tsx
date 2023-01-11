import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { InputContainer } from '../templates/MeetingCreate/styled';
import { useRecoilState } from 'recoil';
import { createMeetingState } from '../stores/createMeeting';
import { TextField, InputLabel, Typography } from '@mui/material';
import React from 'react';

export function MeetingCreate() {
  const [meeting, setMeeting] = useRecoilState(createMeetingState);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeeting({
      ...meeting,
      name: event.target.value,
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
        </InputContainer>
      </Contents>
      <Footer>Footer Area</Footer>
    </Page>
  );
}
