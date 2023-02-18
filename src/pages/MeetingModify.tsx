import { useRecoilState } from 'recoil';

import { Page } from '../components/pageLayout';
import useMeetingEdit from '../hooks/useMeetingEdit';
import { modifyMeetingState } from '../stores/modifyMeeting';

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
