import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { confirmMeeting } from '../../apis/meetings';
import { VotingSlot } from '../../apis/votes';
import { MeetingStatus } from '../../constants/meeting';
import { MEETING_QUERY_KEY, useMeeting } from '../useMeeting';
import { useProgress } from '../useProgress';

export const useMeetingConfirmFooter = (selectedSlot?: VotingSlot) => {
  const { meeting, meetingId } = useMeeting();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const { show, hide } = useProgress();
  const queryClient = useQueryClient();
  const comfirmMeetingMutation = useMutation<void, Error, { meetingId: string; slot: VotingSlot }>({
    mutationFn: ({ meetingId, slot }) => confirmMeeting(meetingId, slot),
    onMutate: () => show(),
    onSuccess: () => {
      queryClient.setQueryData([MEETING_QUERY_KEY, meetingId], {
        ...meeting,
        status: MeetingStatus.done,
      });
      navigate(`/meetings/${meetingId}/result`);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : '정상적으로 처리되지 못했습니다.';
      alert(errorMessage);
      setShowConfirmModal(false);
    },
    onSettled: () => hide(),
  });

  const handleConfirm = () => {
    if (!selectedSlot) {
      return;
    }

    show();
    comfirmMeetingMutation.mutate({ meetingId, slot: selectedSlot });
  };

  return {
    meetingId,
    showConfirmModal,
    navigate,
    handleConfirm,
    setShowConfirmModal,
  };
};
