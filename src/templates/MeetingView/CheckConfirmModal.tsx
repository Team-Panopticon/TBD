import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import { CenterContentModal } from '../../components/CenterContentModal';
import { CenteredButtonContainer, ConfirmModalContainer } from '../MeetingEdit/styled';
import { ModalTopRightButton } from './styled';

interface Props {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CheckConfirmModal({ show, onConfirm, onCancel }: Props) {
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
          <Button variant="contained" style={{ width: 200, height: 48 }} onClick={onConfirm}>
            확인
          </Button>
        </CenteredButtonContainer>
      </ConfirmModalContainer>
    </CenterContentModal>
  );
}
