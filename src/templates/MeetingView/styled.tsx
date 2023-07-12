import { IconButton, styled } from '@mui/material';

export const UserListWrapper = styled('div')({
  '.user-list': {
    border: '1px solid #d9d9d9',
    padding: '8px',
  },
});

export const UserListLabel = styled('div')({
  marginBottom: '8px',
});

export const VoteTableWrapper = styled('div')({
  marginTop: '36px',
  '.vote-table': {
    marginBottom: '8px',
  },
});

export const ShareButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  button: {
    borderRadius: 0,
  },
});

export const PrimaryBold = styled('span')((props) => ({
  color: props.theme.palette.primary.main,
  fontWeight: 700,
}));

export const ModalTopRightButton = styled(IconButton)({
  position: 'absolute',
  top: 16,
  right: 16,
});
