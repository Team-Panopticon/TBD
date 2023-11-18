import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const DropdownContainer = styled('div')({
  position: 'relative',
  marginLeft: '8px',
});

export const ImageWrapper = styled('button')({
  color: '#000000',
  background: 'none',
  border: '0',
  display: 'flex',
  width: '24px',
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
  padding: '12px 12px',
  color: props.theme.palette.transPrimary.contrastText,
  gap: '12px',
  '&:hover': {
    backgroundColor: props.theme.palette.transPrimary.main,
  },
  width: '100%',
  justifyContent: 'flex-start',
}));
