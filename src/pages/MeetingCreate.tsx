import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { createMeeting } from '../apis/meetings';
import { Page } from '../components/pageLayout';
import useMeetingEdit from '../hooks/useMeetingEdit';
import { showProgressState } from '../stores/showProgress';
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
  const setShowProgress = useSetRecoilState(showProgressState);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { getMeetingEditSteps } = useMeetingEdit();
  const meetingeditSteps = useMemo(() => {
    return getMeetingEditSteps('create');
  }, [getMeetingEditSteps]);

  const navigate = useNavigate();

  const onConfirm = async (setPassword: boolean): Promise<void> => {
    try {
      setShowProgress(true);
      const response = await createMeeting(meeting as ValidCreateMeetingState, setPassword);
      navigate(`/meetings/${response.id}`);
    } catch (e) {
      /**
       * @TODO
       * Meeting을 생성하지 못했을 경우 처리
       */
    } finally {
      setShowProgress(false);
    }
  } 


  const handleMeetingEditComplete = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordChange = (newPassword: string) => {
    setMeeting((prev) => ({
      ...prev,
      password: newPassword,
    }));
  };

  const handlePasswordConfirm = async (setPassword: boolean) => {
    try {
      setShowProgress(true);
      const response = await createMeeting((meeting as ValidCreateMeetingState), setPassword);
      navigate(`/meetings/${response.id}`);
    } catch (e) {
      /**
       * @TODO
       * Meeting을 생성하지 못했을 경우 처리
       */
    } finally {
      setShowProgress(false);
    }
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
        onCancel={() => setShowPasswordModal(false)}
      />
    </Page>
  );
}
