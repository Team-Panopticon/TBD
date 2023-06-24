import { Button, styled } from '@mui/material';

export const DropdownContainer = styled('div')({
  position: 'relative',
});

export const ImageWrapper = styled('button')({
  background: 'none',
  border: '0',
  display: 'flex',
  width: '25px',
  cursor: 'pointer',
  img: {
    width: '100%',
  },
});

export const DropdownContentWrapper = styled('div')((props) => ({
  position: 'absolute',
  backgroundColor: props.theme.palette.secondary.main,
  left: '29px',
  top: 0,
}));

export const DropdownButton = styled(Button)((props) => ({
  whiteSpace: 'nowrap',
  padding: '4px 12px',
  color: props.theme.palette.transPrimary.contrastText,

  '&:hover': {
    backgroundColor: props.theme.palette.transPrimary.main,
  },
}));
