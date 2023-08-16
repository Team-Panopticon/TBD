import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import React, { useRef } from 'react';

import { useKakaoShare } from '../hooks/useKakaoShare';

export const KakaoShareButton = () => {
  const ref = useRef<HTMLAnchorElement>(null);

  useKakaoShare({
    ref,
    title: 'XXX 모임 투표',
    description: '모임 투표를 부탁드려요.',
    url: 'https//localhost:5173',
  });

  return (
    <ListItem disableGutters>
      <ListItemButton autoFocus ref={ref} href="">
        <ListItemAvatar>
          <Avatar>+</Avatar>
        </ListItemAvatar>
        <ListItemText primary="카카오톡" />
      </ListItemButton>
    </ListItem>
  );
};
