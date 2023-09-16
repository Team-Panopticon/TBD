import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { createMeeting } from '../apis/meetings';
import { Page } from '../components/pageLayout';
import useMeetingEdit from '../hooks/useMeetingEdit';
import { createMeetingState, ValidCreateMeetingState } from '../stores/createMeeting';
import { CreatePasswordModal } from '../templates/MeetingEdit/CreatePasswordModal';
import { MeetingEditTemplate } from '../templates/MeetingEdit/MeetingEditTemplate';

/**
 * 모임생성 최상위 페이지
 * - createMeetingState 상태 관리
 * - 모임생성 API 호출
 * - 모임의 수정과 겹치는 공통 로직은 MeetingEditTemplate에서 처리
 */
export function MeetingCreate() {
  const [meeting, setMeeting] = useRecoilState(createMeetingState);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { getMeetingEditSteps } = useMeetingEdit();

  const meetingeditSteps = useMemo(() => {
    return getMeetingEditSteps('create');
  }, [getMeetingEditSteps]);

  const navigate = useNavigate();

  const handleMeetingEditComplete = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordChange = (newPassword: string) => {
    setMeeting((prev) => ({
      ...prev,
      password: newPassword,
    }));
  };

  const createMeetingAndNavigate = async ({ usePassword }: { usePassword: boolean }) => {
    try {
      const response = await createMeeting(meeting as ValidCreateMeetingState, usePassword);
      navigate(`/meetings/${response.id}`);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        alert(e.message);
      } else {
        alert('알수 없는 에러가 발생했습니다');
      }
    }
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
