import { Dayjs } from 'dayjs';
import { CSSProperties, ReactNode } from 'react';

import { VoteData } from '../UserList/UserList';
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

interface Voting extends VoteData {
  total: number;
  current: number;
}

export interface VoteTableData {
  date: Dayjs; // 현재 투표 가능한 날짜
  votings: [Voting, Voting] | [Voting]; // [meal, meal], [date]
}

type onClickHandler = (checked: boolean, target: Voting) => void;

interface Props {
  className?: string;
  style?: CSSProperties;
  data: VoteTableData[];
  onClick?: onClickHandler;

  headers: ReactNode[];
}

export const VoteTable: React.FC<Props> = (props) => {
  const { data, onClick, style, className, headers } = props;

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
        {data.map((item, idx) => (
          <VoteTableContent onClick={onClick} key={`vote-item-${idx}`} item={item} />
        ))}
      </ContentWrapper>
    </VoteTableContainer>
  );
};

interface VoteTableContentProps {
  item: VoteTableData;
  onClick?: onClickHandler;
}

const VoteTableContent: React.FC<VoteTableContentProps> = (props) => {
  const { item, onClick } = props;
  const { date, votings } = item;

  return (
    <Wrapper>
      <DateContentBox>{date.format('M/D (dd)')}</DateContentBox>
      <Divider />
      {votings.map((vote, idx) => {
        const { current, total, focused, checked } = vote;
        return (
          <ContentBox
            key={`vote-content-${idx}`}
            focus={focused}
            checked={checked}
            onClick={() => onClick?.(!checked, vote)}
          >{`${current}/${total} (${((current / total) * 100).toFixed(0)}%)`}</ContentBox>
        );
      })}
    </Wrapper>
  );
};