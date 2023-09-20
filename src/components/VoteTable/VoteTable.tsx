import { Dayjs } from 'dayjs';
import { CSSProperties, ReactNode } from 'react';

import { VotingSlot } from '../../apis/votes';
import { MealType } from '../../constants/meeting';
import { UserListVoteData } from '../UserList/UserList';
import {
  ContentBox,
  ContentWrapper,
  DateContentBox,
  Divider,
  Header,
  HeaderBox,
  OpacityProgress,
  VoteTableContainer,
  Wrapper,
} from './styled';

export interface VoteTableVoting extends UserListVoteData {
  total: number;
  current: number;
  mealType?: MealType;
}

export interface VoteTableRowData {
  date: Dayjs; // 현재 투표 가능한 날짜
  votings: [VoteTableVoting, VoteTableVoting] | [VoteTableVoting]; // [meal, meal], [date]
}

type onClickHandler = (
  date: Dayjs,
  checked: boolean,
  target: VoteTableVoting,
  slot: VotingSlot,
) => void;

interface Props {
  className?: string;
  style?: CSSProperties;
  data: VoteTableRowData[];
  onClick?: onClickHandler;
  headers: ReactNode[];
}

export const VoteTable: React.FC<Props> = (props) => {
  const { data, onClick, style, className, headers } = props;

  const isHideVotingStatus = data.some((item) => item.votings.some((vote) => vote.checked));
  const sortedData = [...data].sort((a, b) => a.date.diff(b.date));

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
        {sortedData.map((item, idx) => (
          <VoteTableContent
            isHideVotingStatus={isHideVotingStatus}
            onClick={onClick}
            key={`vote-item-${idx}`}
            item={item}
          />
        ))}
      </ContentWrapper>
    </VoteTableContainer>
  );
};

interface VoteTableContentProps {
  item: VoteTableRowData;
  onClick?: onClickHandler;
  isHideVotingStatus: boolean;
}

const VoteTableContent: React.FC<VoteTableContentProps> = (props) => {
  const { item, onClick, isHideVotingStatus } = props;
  const { date, votings } = item;

  const handleClick = (checked: boolean, vote: VoteTableVoting, mealType?: MealType) => {
    const slot: VotingSlot = { date, meal: mealType };
    onClick?.(date, !checked, vote, slot);
  };

  return (
    <Wrapper>
      <DateContentBox>{date.format('M/D (dd)')}</DateContentBox>
      <Divider />
      {votings.map((vote, idx) => {
        const { current, total, focused, checked, mealType } = vote;
        const progress = Number(((current / total || 0) * 100).toFixed(0));

        return (
          <ContentBox
            progress={progress}
            isHideVotingStatus={isHideVotingStatus}
            key={`vote-content-${idx}`}
            focus={focused}
            checked={checked}
            onClick={() => handleClick(checked, vote, mealType)}
          >
            <OpacityProgress isHide={isHideVotingStatus} progress={progress} />
            <span>{`${current}/${total} (${progress}%)`}</span>
          </ContentBox>
        );
      })}
    </Wrapper>
  );
};
