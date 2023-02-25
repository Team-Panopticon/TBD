import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

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
  return (
    <Page>
      <MeetingEditTemplate
        meeting={meeting}
        meetingEditSteps={meetingeditSteps}
        currentStep={currentStep}
        setStep={setCurrentStep}
        onChange={setMeeting}
      ></MeetingEditTemplate>
    </Page>
  );
}
