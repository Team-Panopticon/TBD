import { styled } from '@mui/material';

export const ChipContainer = styled('div')<{ checked?: boolean; focus?: boolean }>((props) => ({
  height: '24px',
  padding: '6px 8px',
  boxShadow: `${props.focus ? `inset 0 0 0 2px #009568` : `none`}`,

  '&:hover': {
    cursor: 'pointer',
  },

  backgroundColor: props.checked
    ? props.theme.palette.primary.main
    : props.theme.palette.secondary.main,

  color: props.checked ? 'white' : 'inherit',
}));
