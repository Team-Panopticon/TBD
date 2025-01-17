import { UserList } from '../../../components/UserList/UserList';
import { useMeetingResultContents } from '../../../hooks/MeetingResult/useMeetingResultContents';
import MeetingResultContentsSkeleton from './MeetingResultContentsSkeleton';

const MeetingResultContents = () => {
  const { confirmedUserList, missedUserList, isFetching } = useMeetingResultContents();

  if (isFetching) {
    return <MeetingResultContentsSkeleton />;
  }

  return (
    <>
      <UserList users={confirmedUserList}>
        <UserList.Title> 올 수 있는 사람들</UserList.Title>
        <UserList.Placeholder>{':('}</UserList.Placeholder>
      </UserList>

      <UserList users={missedUserList}>
        <UserList.Title color="secondary"> 아쉽지만 못오는 사람들</UserList.Title>
        <UserList.Placeholder>{':)'}</UserList.Placeholder>
      </UserList>
    </>
  );
};

export default MeetingResultContents;
