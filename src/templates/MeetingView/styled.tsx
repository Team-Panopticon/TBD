import { Button, IconButton, styled } from '@mui/material';

export const UserListWrapper = styled('div')({
  '.user-list': {
    border: '1px solid #d9d9d9',
    padding: '8px',
  },
});

export const UserListLabel = styled('div')({
  marginBottom: '8px',
});

export const NoUserList = styled('div')((props) => ({
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  color: props.theme.palette.grey[500],
}));

export const VoteTableWrapper = styled('div')({
  marginTop: '36px',
  '.vote-table': {
    marginBottom: '8px',
  },
});

export const ShareButton = styled(Button)((props) => ({
  color: props.theme.palette.transPrimary.contrastText,

  '&:hover': {
    backgroundColor: props.theme.palette.transPrimary.main,
  },
}));

export const PrimaryBold = styled('span')((props) => ({
  color: props.theme.palette.primary.main,
  fontWeight: 700,
}));

export const ModalTopRightButton = styled(IconButton)({
  position: 'absolute',
  top: 16,
  right: 16,
});
