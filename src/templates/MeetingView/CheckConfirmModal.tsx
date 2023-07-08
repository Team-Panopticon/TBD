import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import { CenterContentModal } from '../../components/CenterContentModal';
import { CenteredButtonContainer, ConfirmModalContainer } from '../MeetingEdit/styled';
import { ModalTopRightButton } from './styled';

type VoidCallback = () => void;
type VoidPromiseCallback = () => Promise<void>;

interface Props {
  show: boolean;
  onConfirm: VoidCallback | VoidPromiseCallback;
  onCancel: VoidCallback;
}

export function CheckConfirmModal({ show, onConfirm, onCancel }: Props) {
  const handleClickConfirmButton = () => {
    onConfirm();
  };

  return (
    <CenterContentModal open={show} width={330} height={230}>
      <ConfirmModalContainer>
        <Box>
          <Typography variant="subtitle1" fontWeight={300}>
            모임 날짜를 확정하시겠어요?
          </Typography>
          <Typography variant="subtitle1" fontWeight={300}>
            확정한 날짜는 돌이킬 수 없습니다.
          </Typography>
        </Box>
        <ModalTopRightButton onClick={onCancel}>
          <CloseIcon />
        </ModalTopRightButton>
        <CenteredButtonContainer>
          <Button
            variant="contained"
            style={{ width: 200, height: 48 }}
            onClick={handleClickConfirmButton}
          >
            확인
          </Button>
        </CenteredButtonContainer>
      </ConfirmModalContainer>
    </CenterContentModal>
  );
}
