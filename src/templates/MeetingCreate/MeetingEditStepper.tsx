import { Divider, InputLabel, TextField } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components';
import { DateInput } from '../../components/DateInput';
import { MeetingType } from '../../constants/meeting';
import { IMeetingEditStep } from '../../hooks/useMeetingEdit';
import { CreateMeetingState } from '../../stores/createMeeting';
import { SelectMeetingType } from './SelectMeetingType';
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
`;

export interface IMeetingEditStepper {
  step: number;
  onChange: SetterOrUpdater<CreateMeetingState>;
  meetingEditSteps: IMeetingEditStep[];
  meeting: CreateMeetingState;
}

export function MeetingEditStepper({ meeting, step, onChange }: IMeetingEditStepper) {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((prev) => {
      return {
        ...prev,
        name: event.target.value,
      };
    });
  };
  const handleDeadlineChange = (deadline: string) => {
    onChange((prev) => {
      return {
        ...prev,
        deadline: deadline,
      };
    });
  };
  const handleMeetingTypeChange = (type: MeetingType) => {
    onChange((prev) => {
      return {
        ...prev,
        type: type,
      };
    });
  };
  return (
    <>
      <StepBox show={step > 2}>
        <InputLabel htmlFor="deadline" shrink>
          투표 기한
        </InputLabel>
        <DateInput
          selectedDate={meeting.deadline}
          onChange={handleDeadlineChange}
          minDate={dayjs()}
        />
      </StepBox>
      <Divider />
      <StepBox show={step > 1}>
        <InputContainer>
          <div>
            <InputLabel htmlFor="name" shrink>
              투표 종류
            </InputLabel>
            <SelectMeetingType value={meeting.type} onChange={handleMeetingTypeChange} />
          </div>
        </InputContainer>
      </StepBox>
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
