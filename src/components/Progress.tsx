import { CircularProgress, Modal, styled } from '@mui/material';
import { useRecoilState } from 'recoil';

import { showProgressState } from '../stores/showProgress';

const ProgressContainer = styled('div')({
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

export function Progress() {
  const [showProgress] = useRecoilState(showProgressState);

  return (
    <Modal open={showProgress}>
      <ProgressContainer>
        <CircularProgress />
      </ProgressContainer>
    </Modal>
  );
}
