import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Box, Button, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { confirmMeeting, getMeeting } from '../apis/meetings';
import { getVotings, Voting, VotingSlot } from '../apis/votes';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { VoteTable, VoteTableVoting } from '../components/VoteTable/VoteTable';
import { MeetingStatus, MeetingType } from '../constants/meeting';
import { useMeetingView } from '../hooks/useMeetingView';
import { isSameSlot } from '../hooks/useMeetingVote';
import { votingsState } from '../stores/voting';
import { CheckConfirmModal } from '../templates/MeetingView/CheckConfirmModal';
import { VoteTableWrapper } from '../templates/MeetingView/styled';

interface MeetingConfirmPathParams {
  meetingId: string;
}

export function MeetingConfirm() {
  const navigate = useNavigate();

  const { meetingId } = useParams<keyof MeetingConfirmPathParams>() as MeetingConfirmPathParams;
  const {
    data: meeting,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => getMeeting(meetingId),
  });

  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const {
    handleClickVoteTable: handleVoteTableClickHightlight,
    userList,
    voteTableDataList,
  } = useMeetingView(meeting);

  const [selectedSlot, setSelectedSlot] = useState<VotingSlot>();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const comfirmMeetingMutation = useMutation<void, Error, { meetingId: string; slot: VotingSlot }>({
    mutationFn: ({ meetingId, slot }) => confirmMeeting(meetingId, slot),
    onSuccess: () => {
      queryClient.setQueryData(['meeting', meetingId], {
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
  });

  // TODO: Recoil로 비동기 데이터 가져오는 것 대체
  useEffect(() => {
    (async () => {
      if (!meetingId) {
        return;
      }

      const data = await getVotings(meetingId);
      setVotings(data);
    })();
  }, [setVotings, meetingId]);

  if (isLoading || isError || !meeting) {
    return null;
  }

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

    comfirmMeetingMutation.mutate({ meetingId, slot: selectedSlot });
  };

  return (
    <Page>
      <Header>
        <HeaderContainer>
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
                  {meeting.name}
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
        </HeaderContainer>
      </Header>
      <Contents>
        <UserList users={userList}>
          <UserList.Title color="primary">투표 현황</UserList.Title>
        </UserList>

        <VoteTableWrapper>
          <VoteTable
            onSlotClick={handleClickVoteTable}
            data={voteTableDataList}
            headers={meeting.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
          />
        </VoteTableWrapper>
      </Contents>
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
            취소하기
          </Button>
          <Button
            color="primary"
            disabled={!selectedSlot}
            onClick={() => {
              setShowConfirmModal(true);
            }}
          >
            모임시간 확정
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
