import { Dayjs } from 'dayjs';
import { CSSProperties } from 'react';

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
  date: Dayjs;
  votings: Voting[];
}

type onClickHandler = (checked: boolean, target: Voting) => void;

interface Props {
  className?: string;
  style?: CSSProperties;
  data: VoteTableData[];
  onClick?: onClickHandler;
}

export const VoteTable: React.FC<Props> = (props) => {
  const { data, onClick, style, className } = props;

  return (
    <VoteTableContainer className={className} style={style}>
      <Header>
        <HeaderBox>투표 가능 날짜</HeaderBox>
        <Divider />
        <HeaderBox>점심</HeaderBox>
        <HeaderBox>저녁</HeaderBox>
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
          >{`${current}/${total} (${(current / total) * 100}%)`}</ContentBox>
        );
      })}
    </Wrapper>
  );
};
