import { styled } from '@mui/material';

export const Container = styled('div')({});

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
