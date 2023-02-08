import { InputLabel } from '@mui/material';
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
  flex-direction: column;

  transition: all 1.5s ease-in-out;

  max-height: ${({ show }) => (show ? '100%' : '0')};

  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
`;
const StepBoxContainer = styled.div`
  padding: 0 32px;
  transition: all 1s ease-out;
  height: 100%;
  overflow: scroll;
  padding-bottom: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

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
        if (step.type === 'confirm') return;
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
