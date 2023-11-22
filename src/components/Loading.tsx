import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const LoadingContainer = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

const Dimmmed = styled('div')({
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  opacity: 0.5,
});

export function Loading() {
  return (
    <LoadingContainer>
      <Dimmmed />
      <CircularProgress />
    </LoadingContainer>
  );
}
