import { Fab, styled } from '@mui/material';

export const BottomFABContainer = styled('div')`
  position: fixed;
  bottom: 72px;
  right: calc(50% - 24px);
`;

export const BottomFloatingActionButton = styled(Fab)`
  animation: bounce 2s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(1.05, 0.95) translateY(0);
    }
    30% {
      transform: scale(0.95, 1.05) translateY(-12px);
    }
    50% {
      transform: scale(1.05, 0.95) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(-4px);
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }
`;
