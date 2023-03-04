import { useMemo, useState } from 'react';
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

  const onEndCreate = async () => {
    await createMeeting(meeting);
    /**
     * @TODO
     * 응답 시 리다이렉팅
     */
  };

  return (
    <Page>
      <MeetingEditTemplate
        meeting={meeting}
        meetingEditSteps={meetingeditSteps}
        currentStep={currentStep}
        setStep={setCurrentStep}
        onChange={setMeeting}
        onConfirm={onEndCreate}
      ></MeetingEditTemplate>
    </Page>
  );
}
