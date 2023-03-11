import { Button, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { SetterOrUpdater } from 'recoil';

import { DateInput } from '../../components/DateInput';
import { Contents, Footer, Header, HeaderContainer } from '../../components/pageLayout';
import { MeetingType } from '../../constants/meeting';
import { IMeetingEditStep } from '../../hooks/useMeetingEdit';
import { CreateMeetingState, validateDeadline, validateMeetingName, validateSelectedDates } from '../../stores/createMeeting';
import { MeetingEditStepper } from './MeetingEditStepper';
import { SelectDates } from './SelectDates';
import { SelectMeetingType } from './SelectMeetingType';
import { BorderLinearProgress, FullHeightButtonGroup } from './styled';

export interface ICreateMeetingTemplateProps {
  currentStep: number;
  meeting: CreateMeetingState;
  setStep?: SetterOrUpdater<number>;
  onChange: SetterOrUpdater<CreateMeetingState>;
  onSubmit: () => void;
  meetingEditSteps: IMeetingEditStep[];
  pageType?: 'create' | 'modify';
}

/**
 * 모임생성, 모임수정을 위한 공통 템플릿
 * - Step 진행 애니메이션, Progress Bar, 메시지 처리
 * - 모임생성, 모임수정에 공통적인 로직 처리
 */
export function MeetingEditTemplate({
  currentStep,
  meeting,
  setStep,
  onChange,
  onSubmit,
  meetingEditSteps,
  pageType,
}: ICreateMeetingTemplateProps) {
  const stepLen = useMemo(() => {
    return meetingEditSteps.length;
  }, [meetingEditSteps]);
  const description = useMemo(() => {
    return meetingEditSteps[currentStep]?.description;
  }, [currentStep]);
  const progress = useMemo(() => {
    return meetingEditSteps[currentStep]?.progress || 0;
  }, [currentStep]);
  const isCurrentStepValid = useMemo(() => {
    return  getIsCurrentStepValid(meetingEditSteps[currentStep]?.type, meeting);
  }, [currentStep, meeting]);

  const onClickNext = () => {
    setStep?.((prev) => (prev < stepLen - 1 ? prev + 1 : prev));
  };
  const onClickPrev = () => {
    setStep?.((prev) => (prev > 0 ? prev - 1 : prev));
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
          currentStep={currentStep}
          meetingEditSteps={meetingEditSteps
            .map((step) => ({
              ...step,
              component: getMeetingEditContent(step.type, onChange, meeting),
            }))
            .reverse()}
        ></MeetingEditStepper>
      </Contents>
      <Footer>
        <FullHeightButtonGroup
          fullWidth
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          {currentStep < meetingEditSteps.length - 1 ? (
            <Button onClick={onClickNext} disabled={!isCurrentStepValid}>다음</Button>
          ) : (
            <Button onClick={onSubmit}>생성하기</Button>
          )}
        </FullHeightButtonGroup>
      </Footer>
    </>
  );
}

const getMeetingEditContent = (
  type: IMeetingEditStep['type'],
  setValue: SetterOrUpdater<CreateMeetingState>,
  meeting: CreateMeetingState,
) => {
  switch (type) {
    case 'name':
      const isMeetingInValid = meeting.name !== undefined && !validateMeetingName(meeting.name);
      const helperText = isMeetingInValid ? '모임의 이름을 입력해주세요' : '';
      return (
        <TextField
          id="name"
          hiddenLabel
          size="small"
          variant="outlined"
          fullWidth
          placeholder="한사랑산악회 신년 모임"
          error={isMeetingInValid}
          helperText={helperText}
          onChange={(v) => {
            setValue((prev) => ({
              ...prev,
              name: v.target.value,
            }));
          }}
        />
      );
    case 'date':
      return (
        <SelectDates
          dates={meeting.dates}
          handleSelectDates={(dates: Dayjs[]) => {
            setValue((prev) => ({
              ...prev,
              dates,
            }));
          }}
        ></SelectDates>
      );
    case 'type':
      return (
        <SelectMeetingType
          value={meeting.type}
          onChange={(type: MeetingType) => {
            setValue((prev) => ({
              ...prev,
              type,
            }));
          }}
        />
      );
    case 'deadline':
      return (
        <DateInput
          selectedDate={meeting.deadline}
          onChange={(v) => {
            setValue((prev) => ({
              ...prev,
              deadline: v,
            }));
          }}
          minDate={dayjs()}
        />
      );
    default:
      return <></>;
  }
};

const getIsCurrentStepValid = (type: IMeetingEditStep['type'], meeting: CreateMeetingState) => {
  const today = dayjs().startOf('day');
  
  switch (type) {
    case 'name':
      return meeting.name !== undefined && validateMeetingName(meeting.name);
    case 'date':
      return meeting.dates.length > 0 && validateSelectedDates({ selectedDates: meeting.dates, today });
    case 'type':
      return meeting.type !== undefined;
    case 'deadline':
      return meeting.deadline !== undefined && validateDeadline({ deadline: meeting.deadline, today });
    default:
      return false;
  }
}