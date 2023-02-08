import { Page } from '../components/pageLayout';
import { useRecoilState } from 'recoil';
import { MeetingEditTemplate } from '../templates/MeetingCreate/MeetingEditTemplate';
import { modifyMeetingState } from '../stores/modifyMeeting';
import { useState } from 'react';
import useMeetingEdit from '../hooks/useMeetingEdit';

export function MeetingModify() {
  const [meeting, setMeeting] = useRecoilState(modifyMeetingState);
  const { getMeetingEditSteps } = useMeetingEdit();
  const meetingeditSteps = getMeetingEditSteps('modify');
  return (
    <Page>
      {/* <MeetingEditTemplate
        meeting={meeting}
        meetingEditSteps={meetingeditSteps}
        step={meetingeditSteps.length - 1}
        onChange={setMeeting}
      ></MeetingEditTemplate> */}
    </Page>
  );
}
