import { Dayjs } from 'dayjs';
import { CSSProperties, ReactNode } from 'react';

import { DateVoting, MealVoting } from '../../stores/voting';
import { UserListVoteData } from '../UserList/UserList';
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

export interface VoteTableVoting extends UserListVoteData {
  total: number;
  current: number;
}

export interface VoteTableRowData {
  date: Dayjs; // 현재 투표 가능한 날짜
  votings: [VoteTableVoting, VoteTableVoting] | [VoteTableVoting]; // [meal, meal], [date]
}

type onClickHandler = (date: Dayjs, checked: boolean, target: VoteTableVoting) => void;

interface Props {
  className?: string;
  style?: CSSProperties;
  rowData: VoteTableRowData[];
  onClick?: onClickHandler;

  headers: ReactNode[];
}

// VoteTable의 역할은?
// 필요한 정보 렌더링: 투표 수 / 총 인원 수, 득표율, 특정 유저가 투표한 칸 highlight
// 투표 칸의 클릭 정보 전달: Date, MealType, 마지막 클릭된 칸
// highlighting을 외부에서 수행해서 전달할 것인가, 아니면 VoteTable 내부에서 계산할 것인가?

export const VoteTable: React.FC<Props> = (props) => {
  const { rowData, onClick, style, className, headers } = props;

  return (
    <VoteTableContainer className={className} style={style}>
      <Header>
        <HeaderBox>투표 가능 날짜</HeaderBox>
        <Divider />
        {headers.map((header, idx) => (
          <HeaderBox key={`vote-table-header-${idx}`}>{header}</HeaderBox>
        ))}
      </Header>
      <ContentWrapper>
        {rowData.map((item, idx) => (
          <VoteTableRow onSlotClick={onClick} key={`vote-item-${idx}`} item={item} />
        ))}
      </ContentWrapper>
    </VoteTableContainer>
  );
};

interface VoteTableRowProps {
  date: Dayjs;
  votingSlots: (DateVoting | MealVoting)[];
  onSlotClick?: onClickHandler;
}

const VoteTableRow: React.FC<VoteTableRowProps> = (props) => {
  const { date, votingSlots, onSlotClick } = props;

  return (
    <Wrapper>
      <DateContentBox>{date.format('M/D (dd)')}</DateContentBox>
      <Divider />
      {votingSlots.map((slot, idx) => {
        const { current, total, focused, checked } = vote;
        return <VoteTableSlot votingSlot={slot} votingStatus={} />;
      })}
    </Wrapper>
  );
};

interface VotingStatus {
  currentCount: number;
  totalCount: number;
}

interface VoteTableSlotProps {
  checked: boolean;
  focused: boolean;
  votingSlot: DateVoting | MealVoting;
  votingStatus: VotingStatus;
  onClick: (newVote: DateVoting | MealVoting) => void;
}

const VoteTableSlot: React.FC<VoteTableSlotProps> = (props) => {
  const { checked, focused, votingSlot, votingStatus, onClick } = props;
  const { currentCount, totalCount } = votingStatus;
  const currentVotePercentage = ((currentCount / totalCount) * 100).toFixed(0);

  return (
    <ContentBox
      focus={focused}
      checked={checked}
      onClick={() => onClick(votingSlot)}
    >{`${currentCount}/${totalCount} (${currentVotePercentage}%)`}</ContentBox>
  );
};
