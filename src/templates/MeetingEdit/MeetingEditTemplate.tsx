import { Button, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { SetterOrUpdater } from 'recoil';

import { Meeting } from '../../apis/types';
import { Contents, Footer, Header, HeaderContainer } from '../../components/pageLayout';
import { FullHeightButtonGroup } from '../../components/styled';
import { MeetingType } from '../../constants/meeting';
import { IMeetingEditStep } from '../../hooks/useMeetingEdit';
import {
  CreateMeetingState,
  validateMeeting,
  validateMeetingName,
  validateSelectedDates,
} from '../../stores/createMeeting';
import { MeetingEditStepper } from './MeetingEditStepper';
import { SelectDates } from './SelectDates';
import { SelectMeetingType } from './SelectMeetingType';
import { BorderLinearProgress } from './styled';

export interface ICreateMeetingTemplateProps<T extends CreateMeetingState | Meeting> {
  currentStep: number;
  meeting: T;
  setStep?: SetterOrUpdater<number>;
  onChange: SetterOrUpdater<T>;
  onSubmit: () => void;
  meetingEditSteps: IMeetingEditStep[];
  pageType: 'create' | 'modify';
}

/**
 * 모임생성, 모임수정을 위한 공통 템플릿
 * - Step 진행 애니메이션, Progress Bar, 메시지 처리
 * - 모임생성, 모임수정에 공통적인 로직 처리
 */
export function MeetingEditTemplate<T extends CreateMeetingState | Meeting>({
  currentStep,
  meeting,
  setStep,
  onChange,
  onSubmit,
  meetingEditSteps,
  pageType,
}: ICreateMeetingTemplateProps<T>) {
  const stepLen = useMemo(() => {
    return meetingEditSteps.length;
  }, [meetingEditSteps]);
  const description = useMemo(() => {
    return meetingEditSteps[currentStep]?.description;
  }, [meetingEditSteps, currentStep]);
  const progress = useMemo(() => {
    return meetingEditSteps[currentStep]?.progress || 0;
  }, [meetingEditSteps, currentStep]);
  const isCurrentStepValid = useMemo(() => {
    return getIsCurrentStepValid(meetingEditSteps[currentStep]?.type, meeting);
  }, [meetingEditSteps, currentStep, meeting]);
  const isMeetingValid = useMemo(() => {
    return validateMeeting(meeting, dayjs().startOf('day'));
  }, [meeting]);

  const onClickNext = () => {
    setStep?.((prev) => (prev < stepLen - 1 ? prev + 1 : prev));
  };

  return (
    <>
      <Header>
        <HeaderContainer>
          <BorderLinearProgress variant="determinate" value={progress} />
          <Typography variant="h5" fontWeight={700} align="center">
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
            <Button onClick={onClickNext} disabled={!isCurrentStepValid}>
              다음
            </Button>
          ) : (
            <Button onClick={onSubmit} disabled={!isMeetingValid}>
              {pageType === 'create' ? '생성하기' : '수정하기'}
            </Button>
          )}
        </FullHeightButtonGroup>
      </Footer>
    </>
  );
}

const getMeetingEditContent = <T extends CreateMeetingState | Meeting>(
  type: IMeetingEditStep['type'],
  setValue: SetterOrUpdater<T>,
  meeting: T,
) => {
  switch (type) {
    case 'name': {
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
          value={meeting.name ?? ''}
          onChange={(v) => {
            if (v.target.value.length > 30) {
              return;
            }
            setValue((prev) => ({
              ...prev,
              name: v.target.value,
            }));
          }}
        />
      );
    }
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
      return (
        meeting.dates.length > 0 && validateSelectedDates({ selectedDates: meeting.dates, today })
      );
    case 'type':
      return meeting.type !== undefined;
    default:
      return false;
  }
};
