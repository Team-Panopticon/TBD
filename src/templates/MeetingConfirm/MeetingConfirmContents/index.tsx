import { VotingSlot } from '../../../apis/votes';
import MeetingContentsSkeleton from '../../../components/MeetingContentsSkeleton';
import { UserList } from '../../../components/UserList/UserList';
import { VoteTable } from '../../../components/VoteTable/VoteTable';
import { MeetingType } from '../../../constants/meeting';
import { useMeetingConfirmContents } from '../../../hooks/MeetingConfirm/useMeetingConfirmContents';
import { VoteTableWrapper } from '../../MeetingView/styled';

interface Props {
  selectedSlot?: VotingSlot;
  setSelectedSlot: React.Dispatch<React.SetStateAction<VotingSlot | undefined>>;
}

const MeetingConfirmContents = (props: Props) => {
  const { userList, handleClickVoteTable, voteTableDataList, meeting, isFetching } =
    useMeetingConfirmContents(props);

  if (isFetching) {
    return <MeetingContentsSkeleton />;
  }

  return (
    <>
      <UserList users={userList} isSticky>
        <UserList.Title color="primary">투표 현황</UserList.Title>
      </UserList>

      <VoteTableWrapper>
        <VoteTable
          onSlotClick={handleClickVoteTable}
          data={voteTableDataList}
          headers={meeting?.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
        />
      </VoteTableWrapper>
    </>
  );
};

export default MeetingConfirmContents;
