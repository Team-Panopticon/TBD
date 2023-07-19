import Typography from '@mui/material/Typography';
import React, { CSSProperties, ReactNode } from 'react';

import { User } from '../../stores/currentUser';
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

const UserListMain: React.FC<Props> = (props) => {
  const { users, style, className, onClick, children } = props;

  return (
    <FlexVertical gap={0.5}>
      <div>{children}</div>

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
    </FlexVertical>
  );
};
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

export const UserList = Object.assign(UserListMain, { Title: UserListTitle });
