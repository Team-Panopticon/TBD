import { Divider, InputLabel, TextField } from '@mui/material';
import React from 'react';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components';
import { IMeetingEditStep } from '../../hooks/useMeetingEdit';
import { CreateMeetingState } from '../../stores/createMeeting';
import { InputContainer } from './styled';

interface StepBox {
  show: boolean;
}
const StepBox = styled.div<StepBox>`
  display: flex;

  transition: all 0.8s ease-in-out;
  transition-origin: top;

  height: ${({ show }) => (show ? '100px' : '0px')};
  margin: ${({ show }) => (show ? '10px 0' : '0px')};

  padding: 0 32px;
  overflow: hidden;

  //   background-color: aquamarine;
  //   align-items: center;
  //   justify-content: center;
`;

export interface IMeetingEditStepper {
  step: number;
  onChange: SetterOrUpdater<CreateMeetingState>;
  meetingEditSteps: IMeetingEditStep[];
}

export function MeetingEditStepper({ step, onChange }: IMeetingEditStepper) {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((prev) => {
      return {
        ...prev,
        name: event.target.value,
      };
    });
  };
  return (
    <>
      <StepBox show={step > 2}>기한</StepBox>
      <Divider />
      <StepBox show={step > 1}>종류</StepBox>
      <Divider />
      <StepBox show={step > 0}>달력</StepBox>
      <Divider />
      <StepBox show={step > -1}>
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
      </StepBox>
    </>
  );
}
