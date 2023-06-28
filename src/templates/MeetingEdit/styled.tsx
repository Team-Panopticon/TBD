import { Button, LinearProgress, styled, ToggleButtonGroup } from '@mui/material';

export const InputContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const InputLabel = styled('label')({
  paddingBottom: '4px',
});

export const CustomTogglebuttonGroup = styled(ToggleButtonGroup)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '25px',
});

export const customButtonStyle: React.CSSProperties = {
  border: '1px solid #D9D9D9',
  borderRadius: '4px',
};

// StyledComponent for MeetingEditTemplate
export const BorderLinearProgress = styled(LinearProgress)({
  height: 8,
  borderRadius: 4,
});

// StyledComponent for MeetingEditStepper
export interface StepBox {
  show: boolean;
}

export const StepBox = styled('div')<StepBox>((props) => ({
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.8s ease-in-out',
  maxHeight: props.show ? '100%' : '0',
  paddingBottom: props.show ? '20px' : '0',

  overflow: 'hidden',
  flexShrink: 0,
  flexGrow: 0,
}));

export const StepBoxContainer = styled('div')({
  padding: '0 32px',
  height: '100%',
  overflow: 'scroll',
  paddingBottom: '4px',
  display: 'flex',
  flexDirection: 'column',
});

export const PasswordInput = styled('div')({
  padding: '25px 35px',

  display: 'flex',
  flexDirection: 'column',

  flexGrow: 1,
});

export const MaskingInputContainer = styled('div')({
  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const PasswordSkipBtn = styled(Button)({
  position: 'absolute',
  right: '5px',
  top: '5px',
});

export const ConfirmModalContainer = styled('div')({
  padding: '25px 35px',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
});

export const CenteredButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});
