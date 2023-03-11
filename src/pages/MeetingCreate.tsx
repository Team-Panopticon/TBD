import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { createMeeting } from '../apis/meetings';
import { Page } from '../components/pageLayout';
import useMeetingEdit from '../hooks/useMeetingEdit';
import { createMeetingState } from '../stores/createMeeting';
import { MeetingEditTemplate } from '../templates/MeetingEdit/MeetingEditTemplate';

export function MeetingCreate() {
  const [meeting, setMeeting] = useRecoilState(createMeetingState);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { getMeetingEditSteps } = useMeetingEdit();
  const meetingeditSteps = useMemo(() => {
    return getMeetingEditSteps('create');
  }, [getMeetingEditSteps]);

  const navigate = useNavigate();

  const onConfirm = async (setPassword: boolean): Promise<void> => {
    try {
      const response = await createMeeting(meeting, setPassword);
      navigate(`/meetings/${response.id}`);
    } catch (e) {
      /**
       * @TODO
       * Meeting을 생성하지 못했을 경우 처리
       */
    }
  };

  return (
    <Page>
      <MeetingEditTemplate
        meeting={meeting}
        meetingEditSteps={meetingeditSteps}
        currentStep={currentStep}
        setStep={setCurrentStep}
        onChange={setMeeting}
        onConfirm={onConfirm}
      ></MeetingEditTemplate>
    </Page>
  );
}
