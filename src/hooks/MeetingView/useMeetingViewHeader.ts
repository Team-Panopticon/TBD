import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { issuePublicMeetingAdminToken } from '../../apis/meetings';
import { INPUT_PASSWORD_FINISH_EVENT } from '../../constants/meeting';
import { adminTokenStateFamily } from '../../stores/adminToken';
import { currentUserStateFamily } from '../../stores/currentUser';
import { showVoteSuccessPopupState } from '../../stores/showVoteSuccessPopup';
import { useMeeting } from '../useMeeting';

export const useMeetingViewHeader = () => {
  const { meeting, meetingId } = useMeeting();
  const navigate = useNavigate();
  const [adminToken, setAdminToken] = useRecoilState(adminTokenStateFamily(meetingId));
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [showVoteSuccessPopup, setShowVoteSuccessPopup] = useRecoilState(showVoteSuccessPopupState);
  const currentUser = useRecoilValue(currentUserStateFamily(meetingId));
  const { mutate } = useMutation({
    mutationFn: async (params: { meetingId: string; destination: string }) =>
      issuePublicMeetingAdminToken(params.meetingId),
    onSuccess: (token, { destination }) => {
      setAdminToken(token);
      navigate(destination);
    },
  });

  // Create a promise that resolves when the user closes the password input modal
  const openInputPasswordModal = () => {
    setShowPasswordModal(true);

    const inputPasswordFinishPromise = new Promise((resolve, reject) => {
      addEventListener(
        INPUT_PASSWORD_FINISH_EVENT,
        (event) => resolve((event as CustomEvent).detail),
        {
          once: true,
        },
      );
    });

    return inputPasswordFinishPromise;
  };

  const handlePasswordModalConfirm = () => {
    dispatchEvent(new CustomEvent(INPUT_PASSWORD_FINISH_EVENT, { detail: true }));
  };

  const handlePasswordModalCancel = () => {
    dispatchEvent(new CustomEvent(INPUT_PASSWORD_FINISH_EVENT, { detail: false }));
    setShowPasswordModal(false);
  };

  const handleClickSettingsButton = async (destination: string) => {
    const isLoggedInAsAdmin = adminToken !== undefined;
    if (isLoggedInAsAdmin) {
      navigate(destination);
      return;
    }

    if (meeting?.adminAccess === 'public') {
      mutate({ meetingId, destination });
      return;
    }

    // Private meeting AND Not yet logged in as admin
    const isInputPasswordResolved = await openInputPasswordModal();

    if (isInputPasswordResolved) {
      navigate(destination);
    }
  };

  return {
    currentUser,
    meeting,
    meetingId,
    showPasswordModal,
    showVoteSuccessPopup,
    setShowVoteSuccessPopup,
    handleClickSettingsButton,
    handlePasswordModalConfirm,
    handlePasswordModalCancel,
  };
};
