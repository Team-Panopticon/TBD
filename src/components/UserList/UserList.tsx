import React, { CSSProperties } from 'react';

import { Chip } from '../Chip/Chip';
import { UserListContainer } from './styled';

export type DataType = {
  checked: boolean;
  focused: boolean;
};

export type UserDataType = DataType & {
  username: string;
};

export type handler<T extends DataType> = (checked: boolean, target: T) => void;

type Props = {
  style?: CSSProperties;
  users: UserDataType[];
  handleClick?: handler<UserDataType>;
};

export const UserList: React.FC<Props> = (props) => {
  const { users, style, handleClick } = props;

  return (
    <UserListContainer style={style}>
      {users.map((targetUser, index) => (
        <Chip
          key={index}
          checked={targetUser.checked}
          focus={targetUser.focused}
          onClick={(checked) => {
            handleClick?.(checked, targetUser);
          }}
        >
          {targetUser.username}
        </Chip>
      ))}
    </UserListContainer>
  );
};
