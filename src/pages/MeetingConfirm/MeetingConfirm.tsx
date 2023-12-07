import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { confirmMeeting } from '../../apis/meetings';
import { Voting, VotingSlot } from '../../apis/votes';
import { Loading } from '../../components/Loading';
import { Footer, Page } from '../../components/pageLayout';
import { FullHeightButtonGroup } from '../../components/styled';
import { MeetingStatus } from '../../constants/meeting';
import { MEETING_QUERY_KEY, useMeeting } from '../../hooks/useMeeting';
import { useProgress } from '../../hooks/useProgress';
import { useVotings } from '../../hooks/useVotings';
import { votingsState } from '../../stores/voting';
import MeetingConfirmContents from '../../templates/MeetingConfirm/MeetingConfirmContents';
import MeetingConfirmHeader from '../../templates/MeetingConfirm/MeetingConfirmHeader';
import { CheckConfirmModal } from '../../templates/MeetingView/CheckConfirmModal';

function MeetingConfirm() {
  const navigate = useNavigate();

  const { meeting, meetingId, isFetching: isMeetingFetching } = useMeeting();
  const { votings, isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const [selectedSlot, setSelectedSlot] = useState<VotingSlot>();

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

  useEffect(() => {
    if (votings) {
      setVotings(votings);
    }
  }, [setVotings, votings]);

  const handleConfirm = () => {
    if (!selectedSlot) {
      return;
    }

    show();
    comfirmMeetingMutation.mutate({ meetingId, slot: selectedSlot });
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Page>
      <MeetingConfirmHeader />
      <MeetingConfirmContents selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Footer>
        <FullHeightButtonGroup
          fullWidth
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            color="secondary"
            onClick={() => {
              navigate(`/meetings/${meetingId}`);
            }}
          >
            취소
          </Button>
          <Button
            color="primary"
            disabled={!selectedSlot}
            onClick={() => {
              setShowConfirmModal(true);
            }}
          >
            모임 확정
          </Button>
        </FullHeightButtonGroup>
      </Footer>
      <CheckConfirmModal
        show={showConfirmModal}
        slot={selectedSlot}
        onConfirm={handleConfirm}
        onCancel={() => {
          setShowConfirmModal(false);
        }}
      />
    </Page>
  );
}

export default MeetingConfirm;
