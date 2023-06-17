import { styled } from '@mui/material';

export const VoteTableContainer = styled('div')({});

export const Header = styled('div')({ display: 'flex', gap: '8px' });

export const ContentWrapper = styled('div')({});

const commonStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '105px',
  height: '30px',
  fontSize: '12px',
  marginBottom: '8px',
};

export const HeaderBox = styled('div')((props) => ({
  ...commonStyle,
  fontWeight: 700,
  backgroundColor: props.theme.palette.secondary.main,
}));

export const DateContentBox = styled('div')((props) => ({
  ...commonStyle,
  backgroundColor: 'white',
  border: `1px solid ${props.theme.palette.secondary.main}`,
}));

export const ContentBox = styled('button')<{ checked?: boolean; focus?: boolean }>((props) => ({
  ...commonStyle,
  backgroundColor: props.checked ? props.theme.palette.primary.main : 'white',
  border: props.checked
    ? `1px solid ${props.theme.palette.primary.main}`
    : `1px solid ${props.theme.palette.secondary.main}`,
  cursor: 'pointer',
  boxShadow: props.focus ? 'inset 0 0 0 2px #009568' : 'none',
  color: props.checked ? 'white' : 'inherit',
}));

export const Wrapper = styled('div')({
  display: 'flex',
  gap: '8px',

  '&:last-child': {
    button: {
      marginBotton: 0,
    },
    div: {
      marginBotton: 0,
    },
  },
});

export const Divider = styled('div')((props) => ({
  border: `1px solid ${props.theme.palette.secondary.main}`,
}));
