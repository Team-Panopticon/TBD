import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { createMeeting } from '../../apis/meetings';
import { warmUpInstance } from '../../apis/utils';
import { Page } from '../../components/pageLayout';
import useMeetingEdit from '../../hooks/useMeetingEdit';
import { useProgress } from '../../hooks/useProgress';
import { createMeetingState } from '../../stores/createMeeting';
import { CreatePasswordModal } from '../../templates/MeetingEdit/CreatePasswordModal';
import { MeetingEditTemplate } from '../../templates/MeetingEdit/MeetingEditTemplate';

/**
 * 모임생성 최상위 페이지
 * - createMeetingState 상태 관리
 * - 모임생성 API 호출
 * - 모임의 수정과 겹치는 공통 로직은 MeetingEditTemplate에서 처리
 */
function MeetingCreate() {
  const [meeting, setMeeting] = useRecoilState(createMeetingState);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { getMeetingEditSteps } = useMeetingEdit();
  const navigate = useNavigate();
  const { show, hide } = useProgress();
  const { mutate } = useMutation({
    mutationFn: (params: Parameters<typeof createMeeting>[0]) => createMeeting(params),
    onMutate: () => show(),
    onSuccess: (res) => navigate(`/meetings/${res.id}`),
    onError: (e) => {
      const errMessage = e instanceof AxiosError ? e.message : '알 수 없는 에러가 발생했습니다';
      alert(errMessage);
    },
    onSettled: () => hide(),
  });

  useEffect(() => {
    warmUpInstance();
  }, []);

  const meetingeditSteps = useMemo(() => {
    return getMeetingEditSteps('create');
  }, [getMeetingEditSteps]);

  const handleMeetingEditComplete = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordChange = (newPassword: string) => {
    setMeeting((prev) => ({
      ...prev,
      password: newPassword,
    }));
  };

  const createMeetingAndNavigate = ({ usePassword }: { usePassword: boolean }) => {
    mutate({
      meeting: { ...meeting, name: meeting.name?.trim() || '' },
      setPassword: usePassword,
    });
  };

  const handlePasswordConfirm = () => {
    createMeetingAndNavigate({ usePassword: true });
  };

  const handlePasswordSkip = () => {
    createMeetingAndNavigate({ usePassword: false });
  };

  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
    setMeeting((prev) => ({
      ...prev,
      password: undefined,
    }));
  };

  return (
    <Page>
      <MeetingEditTemplate
        meeting={meeting}
        meetingEditSteps={meetingeditSteps}
        currentStep={currentStep}
        setStep={setCurrentStep}
        onChange={setMeeting}
        onSubmit={handleMeetingEditComplete}
        pageType="create"
      ></MeetingEditTemplate>
      <CreatePasswordModal
        show={showPasswordModal}
        password={meeting.password}
        onChange={handlePasswordChange}
        onConfirm={handlePasswordConfirm}
        onCancel={handlePasswordCancel}
        onSkip={handlePasswordSkip}
      />
    </Page>
  );
}

export default MeetingCreate;
