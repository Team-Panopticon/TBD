import React, { CSSProperties } from 'react';

import { User } from '../../stores/currentUser';
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
}

export const UserList: React.FC<Props> = (props) => {
  const { users, style, className, onClick } = props;

  return (
    <UserListContainer className={className} style={style}>
      {users.map((targetUser, index) => (
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
      ))}
    </UserListContainer>
  );
};
