import { Page } from '../components/pageLayout';
import { useRecoilState } from 'recoil';
import { createMeetingState } from '../stores/createMeeting';
import { MeetingEditTemplate } from '../templates/MeetingCreate/MeetingEditTemplate';
import { useState } from 'react';
import useMeetingEdit from '../hooks/useMeetingEdit';

export function MeetingCreate() {
  const [meeting, setMeeting] = useRecoilState(createMeetingState);
  const [step, setStep] = useState<number>(0);
  const { getMeetingEditSteps } = useMeetingEdit();
  const meetingeditSteps = getMeetingEditSteps('modify');
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
