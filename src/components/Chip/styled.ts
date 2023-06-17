import { styled } from '@mui/material';

export const ChipContainer = styled('div')<{ checked?: boolean; focus?: boolean }>((props) => ({
  display: 'inline-flex',
  height: '22px',
  padding: '0 4px',
  alignItems: 'center',
  boxShadow: `${props.focus ? `inset 0 0 0 2px #009568` : `none`}`,

  '&:hover': {
    cursor: 'pointer',
  },

  backgroundColor: props.checked
    ? props.theme.palette.primary.main
    : props.theme.palette.secondary.main,

  color: props.checked ? 'white' : 'inherit',
}));
