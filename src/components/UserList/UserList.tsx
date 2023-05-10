import React, { CSSProperties } from 'react';

import { Chip } from '../Chip/Chip';
import { UserListContainer } from './styled';

export interface UserListVoteData {
  /** 투표 여부 */
  checked: boolean;
  /** highlight를 위해 마지막에 유저가 클릭을 했는지 */
  focused: boolean;
}

export interface UserListData extends UserListVoteData {
  username: string;
}

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
        <Chip
          key={index}
          checked={targetUser.checked}
          focus={targetUser.focused}
          onClick={(checked: boolean) => {
            onClick?.(checked, targetUser);
          }}
        >
          {targetUser.username}
        </Chip>
      ))}
    </UserListContainer>
  );
};
