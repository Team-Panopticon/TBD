import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getMeeting, updateMeeting } from '../apis/meetings';
import { Meeting } from '../apis/types';
import { Page } from '../components/pageLayout';
import { MeetingStatus, MeetingType } from '../constants/meeting';
import useMeetingEdit from '../hooks/useMeetingEdit';
import { MeetingEditTemplate } from '../templates/MeetingEdit/MeetingEditTemplate';

interface MeetingViewPathParams {
  meetingId: string;
}

export const initialState = {
  id: '',
  name: '',
  dates: [],
  type: MeetingType.date,
  status: MeetingStatus.inProgress,
  password: undefined,
};

export function MeetingModify() {
  const [meeting, setMeeting] = useState<Meeting>(initialState);
  const { meetingId } = useParams<keyof MeetingViewPathParams>() as MeetingViewPathParams;
  const { getMeetingEditSteps } = useMeetingEdit();

  const {
    data: initialMeeting,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => getMeeting(meetingId),
  });

  useEffect(() => {
    if (initialMeeting) {
      setMeeting(initialMeeting);
    }
  }, [initialMeeting, setMeeting]);

  const meetingeditSteps = useMemo(() => {
    return getMeetingEditSteps('modify');
  }, [getMeetingEditSteps]);

  const navigate = useNavigate();

  if (!meeting || isLoading || isError) {
    return null;
  }

  const handleMeetingEditComplete = () => {
    modifyMeetingAndNavigate();
  };

  const modifyMeetingAndNavigate = async () => {
    try {
      const response = await updateMeeting(meeting);
      navigate(`/meetings/${response.id}`);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        alert(e.message);
      } else {
        alert('알수 없는 에러가 발생했습니다');
      }
    }
  };

  return (
    <Page>
      <MeetingEditTemplate
        currentStep={meetingeditSteps.length - 1}
        meeting={meeting}
        meetingEditSteps={meetingeditSteps}
        onChange={setMeeting}
        onSubmit={handleMeetingEditComplete}
        pageType="modify"
      ></MeetingEditTemplate>
    </Page>
  );
}
