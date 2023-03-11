import React, { CSSProperties } from 'react';

import { Chip } from '../Chip/Chip';
import { UserListContainer } from './styled';

export interface VoteData {
  checked: boolean;
  focused: boolean;
}

export interface UserListData extends VoteData {
  username: string;
}

export type handler<T extends VoteData> = (checked: boolean, target: T) => void;

interface Props {
  style?: CSSProperties;
  users: UserListData[];
  onClick?: handler<UserListData>;
}

export const UserList: React.FC<Props> = (props) => {
  const { users, style, onClick } = props;

  return (
    <UserListContainer style={style}>
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
