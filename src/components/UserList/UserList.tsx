import Typography from '@mui/material/Typography';
import React, { Children, CSSProperties, isValidElement, ReactNode } from 'react';

import { User } from '../../stores/currentUser';
import { NoUserList } from '../../templates/MeetingView/styled';
import { FlexVertical } from '../styled';
import { ChipInnerText, StyledChip, UserListContainer } from './styled';

export interface UserListVoteData {
  /** 투표 여부 */
  checked: boolean;
  /** highlight를 위해 마지막에 유저가 클릭을 했는지 */
  focused: boolean;
}

export interface UserListData extends UserListVoteData, User {}

interface Props {
  className?: string;
  style?: CSSProperties;
  users: UserListData[];
  onClick?: (checked: boolean, target: UserListData) => void;
  children?: ReactNode;
}

const UserListTitle = ({
  color = 'primary',
  children,
}: {
  color?: string;
  children?: ReactNode;
}) => {
  return (
    <Typography variant="caption" fontWeight={500} color={color}>
      {children}
    </Typography>
  );
};
const Placeholder = ({ children }: { children?: ReactNode }) => {
  return (
    <Typography variant="caption" fontWeight={500}>
      {children}
    </Typography>
  );
};
const UserListTitleType = (<UserListTitle />).type;
const PlaceholderType = (<Placeholder />).type;
const getTypeofChildren = (children: ReactNode, type: JSX.Element['type']) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === type);
};
const UserListMain: React.FC<Props> = (props) => {
  const { users, style, className, onClick, children } = props;
  const title = getTypeofChildren(children, UserListTitleType);

  const placeholer = getTypeofChildren(children, PlaceholderType)[0] ? (
    getTypeofChildren(children, PlaceholderType)
  ) : (
    <UserList.Placeholder>
      {<NoUserList>아직 참석할 수 있는 사람이 없어요.</NoUserList>}
    </UserList.Placeholder>
  );
  console.log(placeholer);
  return (
    <FlexVertical gap={0.5}>
      {title && <div>{title}</div>}

      <UserListContainer className={className} style={style}>
        {users.length > 0 ? (
          users.map((targetUser, index) => (
            <StyledChip
              key={index}
              checked={targetUser.checked}
              focus={targetUser.focused}
              onClick={(checked: boolean) => {
                onClick?.(checked, targetUser);
              }}
            >
              <ChipInnerText>{targetUser.username}</ChipInnerText>
            </StyledChip>
          ))
        ) : (
          <>{placeholer}</>
        )}
      </UserListContainer>
    </FlexVertical>
  );
};
export const UserList = Object.assign(UserListMain, {
  Title: UserListTitle,
  Placeholder: Placeholder,
});
