import { InputLabel } from '@mui/material';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components';

import { IMeetingEditStep } from '../../hooks/useMeetingEdit';
import { CreateMeetingState } from '../../stores/createMeeting';
import { InputContainer, StepBox, StepBoxContainer } from './styled';

export interface IMeetingEditStepper {
  currentStep: number;
  onChange: SetterOrUpdater<CreateMeetingState>;
  meetingEditSteps: IMeetingEditStep[];
  meeting: CreateMeetingState;
}

export function MeetingEditStepper({ currentStep, meetingEditSteps }: IMeetingEditStepper) {
  return (
    <StepBoxContainer>
      {meetingEditSteps.map((step, idx) => {
        if (step.type === 'confirm') {
          return;
        }
        return (
          <StepBox show={step.index <= currentStep} key={idx}>
            <div>
              <InputLabel shrink>{step?.title}</InputLabel>
              <InputContainer>{step.component}</InputContainer>
            </div>
          </StepBox>
        );
      })}
    </StepBoxContainer>
  );
}
