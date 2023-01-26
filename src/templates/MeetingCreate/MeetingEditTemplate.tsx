import { SetterOrUpdater } from 'recoil';
import { Typography, Button, ButtonGroup, LinearProgress, styled } from '@mui/material';
import { useMemo } from 'react';
import { Contents, Footer, Header, HeaderContainer, Page } from '../../components/pageLayout';
import { MeetingEditStepper } from './MeetingEditStepper';
import { CreateMeetingState } from '../../stores/createMeeting';
import { IMeetingEditStep } from '../../hooks/useMeetingEdit';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
}));

const FullHeightButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  height: '100%',
}));
export interface ICreateMeetingTemplateProps {
  step: number;

  setStep: SetterOrUpdater<number>;
  onChange: SetterOrUpdater<CreateMeetingState>;
  meetingEditSteps: IMeetingEditStep[];
}
export function MeetingEditTemplate({
  step,
  setStep,
  onChange,
  meetingEditSteps,
}: ICreateMeetingTemplateProps) {
  const description = useMemo(() => {
    return meetingEditSteps[step].description;
  }, [meetingEditSteps, step]);
  const progress = useMemo(() => {
    return meetingEditSteps[step].progress;
  }, [meetingEditSteps, step]);

  const onClickNext = () => {
    setStep((prev) => prev + 1);
  };
  const onClickPrev = () => {
    setStep((prev) => prev - 1);
  };
  return (
    <>
      <Header>
        <HeaderContainer>
          <BorderLinearProgress variant="determinate" value={progress} />
          {/* TOdo: Replace font size with theme properties */}
          <Typography variant="h5" fontWeight={300} align="center">
            {description}
          </Typography>
        </HeaderContainer>
      </Header>
      <Contents>
        <MeetingEditStepper
          step={step}
          meetingEditSteps={meetingEditSteps}
          onChange={onChange}
        ></MeetingEditStepper>
      </Contents>
      <Footer>
        <FullHeightButtonGroup
          fullWidth
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button disabled={step == 0} onClick={onClickPrev}>
            이전
          </Button>
          <Button onClick={onClickNext}>다음</Button>
        </FullHeightButtonGroup>
      </Footer>
    </>
  );
}
