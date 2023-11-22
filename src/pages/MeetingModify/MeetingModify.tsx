import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getMeeting, updateMeeting } from '../../apis/meetings';
import { Meeting } from '../../apis/types';
import { Loading } from '../../components/Loading';
import { Page } from '../../components/pageLayout';
import { MeetingAdminAccess, MeetingStatus, MeetingType } from '../../constants/meeting';
import useMeetingEdit from '../../hooks/useMeetingEdit';
import { useProgress } from '../../hooks/useProgress';
import { MeetingEditTemplate } from '../../templates/MeetingEdit/MeetingEditTemplate';

interface MeetingViewPathParams {
  meetingId: string;
}

export const initialState: Meeting = {
  id: '',
  name: '',
  dates: [],
  type: MeetingType.date,
  status: MeetingStatus.inProgress,
  adminAccess: MeetingAdminAccess.public,
  password: undefined,
};

function MeetingModify() {
  const [meeting, setMeeting] = useState<Meeting>(initialState);
  const { meetingId } = useParams<keyof MeetingViewPathParams>() as MeetingViewPathParams;
  const { getMeetingEditSteps } = useMeetingEdit();
  const navigate = useNavigate();
  const { show, hide } = useProgress();
  const { mutate } = useMutation({
    onMutate: () => show(),
    mutationFn: (params: Parameters<typeof updateMeeting>[0]) => updateMeeting(params),
    onSuccess: (res) => navigate(`/meetings/${res.id}`),
    onError: (e) => {
      const errMessage = e instanceof AxiosError ? e.message : '알 수 없는 에러가 발생했습니다';
      alert(errMessage);
    },
    onSettled: () => hide(),
  });

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

  if (!meeting || isLoading) {
    return <Loading />;
  }

  if (isError) {
    return null;
  }

  const handleMeetingEditComplete = () => mutate(meeting);

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

export default MeetingModify;
