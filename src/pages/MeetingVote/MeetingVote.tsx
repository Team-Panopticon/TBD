import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import WritingHands from '../../assets/writing.svg';
import { Loading } from '../../components/Loading';
import { Header, HeaderContainer, Page } from '../../components/pageLayout';
import { FlexVertical } from '../../components/styled';
import { useMeeting } from '../../hooks/useMeeting';
import { useVotings } from '../../hooks/useVotings';
import { currentUserStateFamily } from '../../stores/currentUser';
import { currentUserVotingSlotsState } from '../../stores/currentUserVotingSlots';
import { votingsState as votingRecoilState } from '../../stores/voting';
import { PrimaryBold } from '../../templates/MeetingView/styled';
import MeetingVoteContents from '../../templates/MeetingVote/MeetingVoteContents';
import MeetingVoteFooter from '../../templates/MeetingVote/MeetingVoteFooter';

function MeetingVote() {
  const [searchParams] = useSearchParams();
  const { meeting, meetingId, isFetching: isMeetingFetching } = useMeeting();
  const { votings, isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  const currentUser = useRecoilValue(currentUserStateFamily(meetingId));
  const setCurrentUserVotingSlots = useSetRecoilState(currentUserVotingSlotsState);
  const isNewUser = !currentUser;

  const setVotingsState = useSetRecoilState(votingRecoilState);
  const navigate = useNavigate();

  useEffect(() => {
    const isFromSharedURL = searchParams.get('ref') === 'share';
    if (isFromSharedURL && !isNewUser) {
      navigate(`/meetings/${meetingId}`);
    }
  }, [isNewUser, meetingId, navigate, searchParams]);

  useEffect(() => {
    if (meeting && votings) {
      setVotingsState(votings);
      const currentUserVoting = votings.find((voting) => voting.id === currentUser?.id);
      const currentUserVotingSlots = currentUserVoting?.[meeting.type];
      setCurrentUserVotingSlots(currentUserVotingSlots ?? []);
    }
  }, [meetingId, setVotingsState, setCurrentUserVotingSlots, currentUser, votings, meeting]);

  if (isFetching) {
    return <Loading />;
  }

  if (!meeting) {
    return null;
  }

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
                <img height={110} src={WritingHands} alt="" />
              </FlexVertical>
              <FlexVertical>
                {currentUser ? (
                  <Typography variant="h6" fontWeight={400} align="center">
                    <PrimaryBold className="primary-bold">{currentUser.username}</PrimaryBold>님의
                    투표를 수정합니다
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    style={{ wordBreak: 'keep-all' }}
                    align="center"
                  >
                    투표하신 적이 있으면 참석자 목록에서 아이디를 눌러주세요
                  </Typography>
                )}
              </FlexVertical>
            </FlexVertical>
          </FlexVertical>
        </HeaderContainer>
      </Header>
      <MeetingVoteContents />
      <MeetingVoteFooter />
    </Page>
  );
}

export default MeetingVote;
