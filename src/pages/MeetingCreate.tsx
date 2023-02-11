import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { Page } from '../components/pageLayout';
import useMeetingEdit from '../hooks/useMeetingEdit';
import { createMeetingState } from '../stores/createMeeting';
import { MeetingEditTemplate } from '../templates/MeetingCreate/MeetingEditTemplate';

export function MeetingCreate() {
  const [meeting, setMeeting] = useRecoilState(createMeetingState);
  const [step, setStep] = useState<number>(0);
  const { getMeetingEditSteps } = useMeetingEdit();
  const meetingeditSteps = getMeetingEditSteps('create');
  return (
    <Page>
      <MeetingEditTemplate
        meeting={meeting}
        meetingEditSteps={meetingeditSteps}
        step={step}
        setStep={setStep}
        onChange={setMeeting}
      ></MeetingEditTemplate>
    </Page>
  );
}
