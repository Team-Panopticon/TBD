import { Dayjs } from 'dayjs';

import { UserMap } from '../../apis/users';
import { MealType, MeetingType } from '../../constants/meeting';
import {
  ContentBox,
  ContentWrapper,
  DateContentBox,
  Divider,
  Header,
  HeaderBox,
  VoteTableContainer,
  Wrapper,
} from './styled';
import { hasUserVotedForSlot } from './utils';

export interface SlotClickHandlerProps {
  date: Dayjs;
  mealType?: MealType;
}

type SlotClickHandler = ({ date, mealType }: SlotClickHandlerProps) => void;

interface VoteTableProps {
  dates: Dayjs[];
  meetingType: MeetingType;
  userMap: UserMap;
  currentUserId?: string;
  onSlotClick: SlotClickHandler;
}

// VoteTable의 역할
// 필요한 정보 렌더링: 투표 수 / 총 인원 수, 득표율, 특정 유저가 투표한 칸 highlight
// 투표 칸의 클릭 정보 전달: Date, MealType, 마지막 클릭된 칸
export const VoteTable: React.FC<VoteTableProps> = (props) => {
  const { dates, meetingType, userMap, currentUserId, onSlotClick } = props;

  const headers = meetingType === MeetingType.date ? ['날짜'] : ['점심', '저녁'];

  return (
    <VoteTableContainer>
      <Header>
        <HeaderBox>투표 가능 날짜</HeaderBox>
        <Divider />
        {headers.map((header, idx) => (
          <HeaderBox key={`vote-table-header-${idx}`}>{header}</HeaderBox>
        ))}
      </Header>
      <ContentWrapper>
        {dates.map((date, idx) => (
          <VoteTableRow
            key={`vote-item-${idx}`}
            date={date}
            meetingType={meetingType}
            userMap={userMap}
            currentUserId={currentUserId}
            onSlotClick={onSlotClick}
          />
        ))}
      </ContentWrapper>
    </VoteTableContainer>
  );
};

interface VoteTableRowProps {
  date: Dayjs;
  meetingType: MeetingType;
  userMap: UserMap;
  currentUserId?: string;
  onSlotClick: SlotClickHandler;
}

const VoteTableRow: React.FC<VoteTableRowProps> = (props) => {
  const { date, meetingType, userMap, currentUserId, onSlotClick } = props;

  return (
    <Wrapper>
      <DateContentBox>{date.format('M/D (dd)')}</DateContentBox>
      <Divider />
      {meetingType === MeetingType.date && (
        <VoteTableSlot
          date={date}
          userMap={userMap}
          currentUserId={currentUserId}
          onSlotClick={onSlotClick}
        />
      )}
      {meetingType === MeetingType.meal &&
        [MealType.dinner, MealType.lunch].map((mealType) => (
          <VoteTableSlot
            key={mealType}
            date={date}
            mealType={mealType}
            userMap={userMap}
            currentUserId={currentUserId}
            onSlotClick={onSlotClick}
          />
        ))}
    </Wrapper>
  );
};

interface VoteTableSlotProps {
  date: Dayjs;
  mealType?: MealType;
  userMap: UserMap;
  currentUserId?: string;
  onSlotClick: SlotClickHandler;
}

const VoteTableSlot: React.FC<VoteTableSlotProps> = (props) => {
  const { date, mealType, userMap, currentUserId, onSlotClick } = props;

  // TODO: focused 상태 관리

  const currentUser = currentUserId && userMap[currentUserId];
  const hasCurrentUserVotedForSlot =
    !!currentUser && hasUserVotedForSlot({ user: currentUser, date, mealType });

  const users = Object.values(userMap);
  const votedUserCount = users.filter((user) =>
    hasUserVotedForSlot({ user, date, mealType }),
  ).length;
  const totalUserCount = users.length;
  const votedPercentage = ((votedUserCount / totalUserCount) * 100).toFixed(0);

  const handleClick = () => {
    onSlotClick({ date, mealType });
  };

  return (
    <ContentBox
      checked={hasCurrentUserVotedForSlot}
      onClick={handleClick}
    >{`${votedUserCount}/${totalUserCount} (${votedPercentage}%)`}</ContentBox>
  );
};
