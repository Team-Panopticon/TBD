import { CircularProgress, Modal } from '@mui/material';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { showProgressState } from '../stores/showProgress';

const ProgressContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

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
