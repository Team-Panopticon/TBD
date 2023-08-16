import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { Meeting } from '../apis/types';
import { KakaoShareButton } from './KakaoShareButton';

export interface SimpleDialogProps {
  open: boolean;
  onClose?: (value: string) => void;
  meeting?: Meeting;
}
export function ShareDialog(props: SimpleDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth={true}>
      <DialogTitle>공유하기</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => {
              doCopy(window.location.href);
            }}
          >
            <ListItemAvatar>
              <Avatar>+</Avatar>
            </ListItemAvatar>
            <ListItemText primary="주소복사" />
          </ListItemButton>
        </ListItem>
        <KakaoShareButton />
      </List>
    </Dialog>
  );
}

const doCopy = (text: string) => {
  // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
  const clipboard = navigator.clipboard;

  if (clipboard) {
    clipboard
      .writeText(text)
      .then(() => {
        alert('클립보드에 복사되었습니다.');
      })
      .catch(() => {
        alert('복사를 다시 시도해주세요.');
      });
  }
};
