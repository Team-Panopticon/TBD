import { Page } from '../components/pageLayout';
import { useRecoilState } from 'recoil';
import { MeetingEditTemplate } from '../templates/MeetingCreate/MeetingEditTemplate';
import { modifyMeetingState } from '../stores/modifyMeeting';
import { useState } from 'react';
import useMeetingEdit from '../hooks/useMeetingEdit';

export function MeetingModify() {
  const [meeting, setMeeting] = useRecoilState(modifyMeetingState);
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
