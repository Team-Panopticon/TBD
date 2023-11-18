import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

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
