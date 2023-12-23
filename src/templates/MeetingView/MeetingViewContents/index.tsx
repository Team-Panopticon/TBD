import { UserList } from '../../../components/UserList/UserList';
import { VoteTable } from '../../../components/VoteTable/VoteTable';
import { MeetingType } from '../../../constants/meeting';
import { useMeetingViewContents } from '../../../hooks/MeetingView/useMeetingViewContents';
import { useMeeting } from '../../../hooks/useMeeting';
import { VoteTableWrapper } from '../styled';

const MeetingViewContents = () => {
  const { meeting } = useMeeting();
  const { handleClickUserList, handleClickVoteTable, userList, voteTableDataList } =
    useMeetingViewContents(meeting);

  return (
    <>
      <UserList className="user-list" users={userList} onClick={handleClickUserList} isSticky>
        <UserList.Title color="primary">투표 현황</UserList.Title>
      </UserList>

      <VoteTableWrapper>
        <VoteTable
          onSlotClick={handleClickVoteTable}
          data={voteTableDataList}
          headers={meeting?.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
          className="vote-table"
        />
      </VoteTableWrapper>
    </>
  );
};

export default MeetingViewContents;
