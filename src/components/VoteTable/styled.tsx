import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const VoteTableContainer = styled('div')({});

export const VoteTableHeader = styled('div')({ display: 'flex', gap: '8px' });

export const ContentWrapper = styled('div')({});

const commonStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '105px',
  height: '30px',
  fontSize: '12px',
  marginTop: '8px',
};

export const VoteTableHeaderBox = styled(Box)((props) => ({
  ...commonStyle,
  fontWeight: 700,
  backgroundColor: props.theme.palette.secondary.main,
  marginTop: 0,
}));

export const DateContentBox = styled('div')((props) => ({
  ...commonStyle,
  backgroundColor: 'white',
  border: `1px solid ${props.theme.palette.secondary.main}`,
}));

export const ContentBox = styled('button')<{
  checked?: boolean;
  focus?: boolean;
  progress: number;
  isHideVotingStatus: boolean;
}>((props) => {
  const getColor = () => {
    const { progress, isHideVotingStatus, checked } = props;

    if (checked) {
      return 'white';
    }

    if (progress >= 80 && !isHideVotingStatus) {
      return 'white';
    }

    return 'black';
  };

  const getBackgroundColor = () => {
    const {
      theme: {
        palette: { primary },
      },
      checked,
    } = props;

    return checked ? primary.main : 'transparent';
  };

  return {
    position: 'relative',
    ...commonStyle,
    backgroundColor: getBackgroundColor(),
    border: props.checked
      ? `1px solid ${props.theme.palette.primary.main}`
      : `1px solid ${props.theme.palette.secondary.main}`,
    cursor: 'pointer',
    boxShadow: props.focus ? 'inset 0 0 0 2px #009568' : 'none',
    color: getColor(),
  };
});

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
  borderRight: `1px solid ${props.theme.palette.secondary.main}`,
}));

export const OpacityProgress = styled('div')<{ progress: number; isHide: boolean }>((props) => ({
  display: props.isHide ? 'none' : 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
  backgroundColor: props.theme.palette.primary.main,
  opacity: `${props.progress}%`,
  width: '100%',
  height: '100%',
}));
