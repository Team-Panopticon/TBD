import { Button, Modal, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { SetterOrUpdater } from 'recoil';

import { DateInput } from '../../components/DateInput';
import { MaskingInput } from '../../components/MaskingInput';
import { Contents, Footer, Header, HeaderContainer } from '../../components/pageLayout';
import { IMeetingEditStep } from '../../hooks/useMeetingEdit';
import { CreateMeetingState } from '../../stores/createMeeting';
import { MeetingEditStepper } from './MeetingEditStepper';
import { SelectDates } from './SelectDates';
import { SelectMeetingType } from './SelectMeetingType';
import {
  BorderLinearProgress,
  FullHeightButtonGroup,
  PasswordInput,
  PasswordInputContainer,
} from './styled';

export interface ICreateMeetingTemplateProps {
  currentStep: number;
  meeting: CreateMeetingState;
  setStep?: SetterOrUpdater<number>;
  onChange: SetterOrUpdater<CreateMeetingState>;
  meetingEditSteps: IMeetingEditStep[];
  pageType?: 'create' | 'modify';
}

export function MeetingEditTemplate({
  currentStep,
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
    return meetingEditSteps[currentStep]?.description;
  }, [currentStep]);
  const progress = useMemo(() => {
    return meetingEditSteps[currentStep]?.progress || 0;
  }, [currentStep]);

  const onClickNext = () => {
    setStep?.((prev) => (prev < stepLen - 1 ? prev + 1 : prev));
  };
  const onClickPrev = () => {
    setStep?.((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const [showMaskingInput, setShowMaskingInput] = useState(false);
  const [passwordText, setPasswordText] = useState('');

  const onEndCreate = () => {
    /**
     * @TODO
     * API 요청, 응답 시 리다이렉팅
     */
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
            <Button onClick={onClickNext}>다음</Button>
          ) : (
            <Button onClick={() => setShowMaskingInput(true)}>생성하기</Button>
          )}
        </FullHeightButtonGroup>
      </Footer>
      <Modal open={showMaskingInput}>
        <PasswordInputContainer>
          <PasswordInput>
            <Typography variant="h6" fontWeight={300}>
              비밀번호를 설정할 수 있어요.
            </Typography>
            <Typography variant="subtitle1" fontWeight={300}>
              모임을 수정하거나 확정할 떄 사용해요
            </Typography>
            <MaskingInput length={4} text={passwordText} setText={setPasswordText} />
            <div style={{ height: 46 }}>
              <FullHeightButtonGroup
                fullWidth
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
              >
                <Button onClick={onEndCreate}>생략하기</Button>
                <Button onClick={onEndCreate}>설정하기</Button>
              </FullHeightButtonGroup>
            </div>
          </PasswordInput>
        </PasswordInputContainer>
      </Modal>
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
      return (
        <TextField
          id="name"
          hiddenLabel
          size="small"
          variant="outlined"
          fullWidth
          placeholder="한사랑산악회 신년 모임"
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
          onChange={(v: number) => {
            setValue((prev) => ({
              ...prev,
              type: v,
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
