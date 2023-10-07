import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import React, { forwardRef } from 'react';

interface Props {
  serviceName: string;
  isError: boolean;
}

export const ShareButton = forwardRef<HTMLAnchorElement, Props>((props: Props, ref) => {
  const { serviceName, isError } = props;

  return (
    <>
      {!isError && (
        <ListItem disableGutters>
          <ListItemButton autoFocus ref={ref} href="" disabled={isError}>
            <ListItemAvatar>
              <Avatar>+</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={serviceName}
              secondary={isError ? '일시적으로 사용할 수 없습니다.' : ''}
            />
          </ListItemButton>
        </ListItem>
      )}
    </>
  );
});
