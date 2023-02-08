import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { DateInput } from '../components/DateInput';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import useMeetingEdit from '../hooks/useMeetingEdit';
import { createMeetingState } from '../stores/createMeeting';
import { MeetingEditTemplate } from '../templates/MeetingCreate/MeetingEditTemplate';

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
