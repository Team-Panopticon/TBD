import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import { createMeeting } from '../apis/meetings';
import { Page } from '../components/pageLayout';
import useMeetingEdit from '../hooks/useMeetingEdit';
import { createMeetingState, ValidCreateMeetingState } from '../stores/createMeeting';
import { InputPasswordModal } from '../templates/MeetingEdit/InputPasswordModal';
import { MeetingEditTemplate } from '../templates/MeetingEdit/MeetingEditTemplate';

/**
 * 모임생성 최상위 페이지
 * - createMeetingState 상태 관리
 * - 모임생성 API 호출
 * - 모임의 수정과 겹치는 공통 로직은 MeetingEditTemplate에서 처리
 */
export function MeetingCreate() {
  const [meeting, setMeeting] = useRecoilState(createMeetingState);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { getMeetingEditSteps } = useMeetingEdit();
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

  const handlePasswordConfirm = async (password?: string) => {
    // 패스워드 입력 단계에서는 이미 유효성 검사를 마친 상태
    await createMeeting({
      ...(meeting as ValidCreateMeetingState),
      password,
    });
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
        onSubmit={handleMeetingEditComplete}
      ></MeetingEditTemplate>
      <InputPasswordModal
        show={showPasswordModal}
        password={meeting.password}
        onChange={handlePasswordChange}
        onConfirm={handlePasswordConfirm}
      />
    </Page>
  );
}
