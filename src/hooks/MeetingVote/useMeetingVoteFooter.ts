import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { createVoting, updateVoting } from '../../apis/votes';
import { currentUserStateFamily } from '../../stores/currentUser';
import { currentUserVotingSlotsState } from '../../stores/currentUserVotingSlots';
import { showVoteSuccessPopupState } from '../../stores/showVoteSuccessPopup';
import { userListState } from '../../stores/voting';
import { useMeeting } from '../useMeeting';
import { useVotings } from '../useVotings';

export const useMeetingVoteFooter = () => {
  const { meetingId, meeting } = useMeeting();
  const { invalidateVotings } = useVotings();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserStateFamily(meetingId));
  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);
  const setShowVoteSuccessPopup = useSetRecoilState(showVoteSuccessPopupState);
  const userList = useRecoilValue(userListState);
  const [currentUserVotingSlots] = useRecoilState(currentUserVotingSlotsState);
  const isNewUser = !currentUser;

  const navigate = useNavigate();

  const { mutate: updateVotingMutate } = useMutation({
    mutationFn: updateVoting,
    onSuccess: async () => {
      setShowUsernameModal(false);
      setShowVoteSuccessPopup(true);
      await invalidateVotings();
      navigate(`/meetings/${meetingId}`);
    },
  });

  const { mutate: createVotingMutate } = useMutation({
    mutationFn: createVoting,
    onSuccess: async (res) => {
      setCurrentUser({
        id: res.id,
        username: res.username,
      });
      setShowUsernameModal(false);
      setShowVoteSuccessPopup(true);
      await invalidateVotings();
      navigate(`/meetings/${meetingId}`);
    },
  });

  const handleClickVote = () => {
    if (!meeting) {
      return;
    }

    if (isNewUser) {
      setShowUsernameModal(true);
      return;
    }

    // Old user
    updateVotingMutate({
      meetingId,
      votingId: currentUser.id,
      data: {
        username: currentUser.username,
        [meeting.type]: currentUserVotingSlots,
      },
    });
  };

  const handleUsernameConfirm = (username: string) => {
    if (!meeting) {
      return;
    }

    createVotingMutate({
      meetingId,
      data: {
        username,
        [meeting.type]: currentUserVotingSlots,
      },
    });
  };

  return {
    meetingId,
    showUsernameModal,
    userList,
    handleClickVote,
    handleUsernameConfirm,
    navigate,
    setShowUsernameModal,
  };
};
