import { UserList } from '../../../components/UserList/UserList';
import { VoteTable } from '../../../components/VoteTable/VoteTable';
import { MeetingType } from '../../../constants/meeting';
import { useMeetingVoteContents } from '../../../hooks/MeetingVote/useMeetingVoteContents';
import { VoteTableWrapper } from '../../MeetingView/styled';

const MeetingVoteContents = () => {
  const {
    meeting,
    checkedUserList,
    voteTableDataList,
    handleClickUser,
    handleClickVoteTableDate,
    handleClickVoteTableSlot,
  } = useMeetingVoteContents();

  return (
    <>
      <UserList
        className="user-list"
        users={checkedUserList}
        onClick={handleClickUser}
        selectedTooltipText="새로운 유저로 투표하려면 다시 클릭해주세요"
      >
        <UserList.Title color="primary">투표 현황</UserList.Title>
      </UserList>
      <VoteTableWrapper>
        <VoteTable
          onDateClick={handleClickVoteTableDate}
          onSlotClick={handleClickVoteTableSlot}
          data={voteTableDataList}
          headers={meeting?.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
        />
      </VoteTableWrapper>
    </>
  );
};

export default MeetingVoteContents;
