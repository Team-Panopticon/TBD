import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { confirmMeeting } from '../../apis/meetings';
import { Voting, VotingSlot } from '../../apis/votes';
import { Loading } from '../../components/Loading';
import { Footer, Page } from '../../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../../components/styled';
import { UserList } from '../../components/UserList/UserList';
import { VoteTable, VoteTableVoting } from '../../components/VoteTable/VoteTable';
import { MeetingStatus, MeetingType } from '../../constants/meeting';
import { useMeetingData } from '../../hooks/useMeetingData';
import { useMeetingView } from '../../hooks/useMeetingView';
import { isSameSlot } from '../../hooks/useMeetingVote';
import { useProgress } from '../../hooks/useProgress';
import { votingsState } from '../../stores/voting';
import { CheckConfirmModal } from '../../templates/MeetingView/CheckConfirmModal';
import { VoteTableWrapper } from '../../templates/MeetingView/styled';

interface MeetingConfirmPathParams {
  meetingId: string;
}

function MeetingConfirm() {
  const navigate = useNavigate();

  const { meetingId } = useParams<keyof MeetingConfirmPathParams>() as MeetingConfirmPathParams;
  const { data, isLoading } = useMeetingData(meetingId);

  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const {
    handleClickVoteTable: handleVoteTableClickHightlight,
    userList,
    voteTableDataList,
  } = useMeetingView(data.meeting);

  const [selectedSlot, setSelectedSlot] = useState<VotingSlot>();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const { show, hide } = useProgress();
  const queryClient = useQueryClient();
  const comfirmMeetingMutation = useMutation<void, Error, { meetingId: string; slot: VotingSlot }>({
    mutationFn: ({ meetingId, slot }) => confirmMeeting(meetingId, slot),
    onMutate: () => show(),
    onSuccess: () => {
      queryClient.setQueryData(['meeting', meetingId], {
        ...data.meeting,
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
    if (data.votings) {
      setVotings(data.votings);
    }
  }, [setVotings, data.votings]);

  const handleClickVoteTable = (
    date: Dayjs,
    checked: boolean,
    target: VoteTableVoting,
    slot: VotingSlot,
  ) => {
    if (selectedSlot && isSameSlot(selectedSlot, slot)) {
      setSelectedSlot(undefined);
    } else {
      setSelectedSlot(slot);
    }
    handleVoteTableClickHightlight(date, checked, target, slot);
  };

  const handleConfirm = () => {
    if (!selectedSlot) {
      return;
    }

    show();
    comfirmMeetingMutation.mutate({ meetingId, slot: selectedSlot });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <>
        <FlexVertical flex={1} alignItems={'center'} gap={1}>
          <FlexVertical flex={1} gap={1} width={'100%'}>
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={1}
            >
              <Typography variant="h5" fontWeight={700}>
                {data.meeting?.name}
              </Typography>
            </Box>
            <FlexVertical alignItems={'center'}>
              <EventAvailableIcon sx={{ fontSize: 110 }} />
            </FlexVertical>
            <Typography variant="h6" fontWeight={400} align="center">
              모임시간을 골라서 확정해주세요
            </Typography>
          </FlexVertical>
        </FlexVertical>
      </>
      <>
        <UserList users={userList} isSticky>
          <UserList.Title color="primary">투표 현황</UserList.Title>
        </UserList>

        <VoteTableWrapper>
          <VoteTable
            onSlotClick={handleClickVoteTable}
            data={voteTableDataList}
            headers={data.meeting?.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
          />
        </VoteTableWrapper>
      </>
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
