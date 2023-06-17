import { Button, LinearProgress, styled, ToggleButtonGroup } from '@mui/material';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputLabel = styled.label`
  padding-bottom: 4px;
`;

export const CustomTogglebuttonGroup = styled(ToggleButtonGroup)`
  display: flex;
  justify-content: space-between;

  gap: 25px;
`;

export const customButtonStyle: React.CSSProperties = {
  border: '1px solid #D9D9D9',
  borderRadius: '4px',
};

// StyledComponent for MeetingEditTemplate
export const BorderLinearProgress = styled(LinearProgress)`
  height: 8;
  border-radius: 4;
`;

// StyledComponent for MeetingEditStepper
export interface StepBox {
  show: boolean;
}
export const StepBox = styled.div<StepBox>`
  display: flex;
  flex-direction: column;

  transition: all 0.8s ease-in-out;

  max-height: ${({ show }) => (show ? '100%' : '0')};

  padding-bottom: ${({ show }) => (show ? '20px' : '0')};

  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
`;
export const StepBoxContainer = styled.div`
  padding: 0 32px;
  height: 100%;
  overflow: scroll;
  padding-bottom: 4px;
  display: flex;
  flex-direction: column;
`;

export const PasswordInput = styled.div`
  padding: 25px 35px;

  display: flex;
  flex-direction: column;

  flex-grow: 1;
`;

export const MaskingInputContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PasswordSkipBtn = styled(Button)`
  position: absolute;
  right: 5px;
  top: 5px;
`;
