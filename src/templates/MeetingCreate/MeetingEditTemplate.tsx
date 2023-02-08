import { SetterOrUpdater } from 'recoil';
import { Typography, Button, ButtonGroup, LinearProgress, styled, TextField } from '@mui/material';
import { useMemo } from 'react';
import { Contents, Footer, Header, HeaderContainer, Page } from '../../components/pageLayout';
import { MeetingEditStepper } from './MeetingEditStepper';
import { CreateMeetingState } from '../../stores/createMeeting';
import { IMeetingEditStep } from '../../hooks/useMeetingEdit';
import dayjs from 'dayjs';
import { SelectMeetingType } from './SelectMeetingType';
import { MeetingType } from '../../constants/meeting';
import { DateInput } from '../../components/DateInput';
import { SelectDates } from './SelectDates';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
}));

const FullHeightButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  height: '100%',

  '& .MuiButton-root': {
    height: '100%',
    borderRadius: 0,
    color: '#fff',
    fontWeight: 500,
  },
}));
export interface ICreateMeetingTemplateProps {
  step: number;
  meeting: CreateMeetingState;
  setStep?: SetterOrUpdater<number>;
  onChange: SetterOrUpdater<CreateMeetingState>;
  meetingEditSteps: IMeetingEditStep[];
  pageType?: 'create' | 'modify';
}

const getMeetingEditContent = (
  type: IMeetingEditStep['type'],
  onChange: SetterOrUpdater<CreateMeetingState>,
  meeting: CreateMeetingState,
) => {
  switch (type) {
    case 'name':
      return (
        <TextField
          id="name"
          hiddenLabel
          size="small"
          variant="outlined"
          fullWidth
          placeholder="한사랑산악회 신년 모임"
          onChange={() => onChange}
        />
      );
    case 'date':
      return <SelectDates></SelectDates>;
    case 'type':
      return <SelectMeetingType value={meeting.type} onChange={() => onChange} />;
    case 'deadline':
      return (
        <DateInput selectedDate={meeting.deadline} onChange={() => onChange} minDate={dayjs()} />
      );
    default:
      return <></>;
  }
};
export function MeetingEditTemplate({
  step,
  meeting,
  setStep,
  onChange,
  meetingEditSteps,
  pageType,
}: ICreateMeetingTemplateProps) {
  const stepLen = useMemo(() => {
    return meetingEditSteps.length;
  }, [meetingEditSteps]);

  const description = useMemo(() => {
    return meetingEditSteps[step]?.description;
  }, [meetingEditSteps, step]);
  const progress = useMemo(() => {
    return meetingEditSteps[step]?.progress || 0;
  }, [meetingEditSteps, step]);

  const onClickNext = () => {
    setStep && setStep((prev) => (prev < stepLen - 1 ? prev + 1 : prev));
  };
  const onClickPrev = () => {
    setStep && setStep((prev) => (prev > 0 ? prev - 1 : prev));
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
          meeting={meeting}
          currentStep={step}
          meetingEditSteps={[
            ...meetingEditSteps.map((step) => ({
              ...step,
              component: getMeetingEditContent(step.type, onChange, meeting),
            })),
          ].reverse()}
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
          {/* <Button disabled={step == 0} onClick={onClickPrev}>
            이전
          </Button> */}
          <Button onClick={onClickNext}>다음</Button>
        </FullHeightButtonGroup>
      </Footer>
    </>
  );
}
