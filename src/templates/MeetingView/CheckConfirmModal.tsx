import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { VotingSlot } from '../../apis/votes';
import { CenterContentModal } from '../../components/CenterContentModal';
import { getMealLabel } from '../../utils/getMealLabel';
import { CenteredButtonContainer, ConfirmModalContainer } from '../MeetingEdit/styled';
import { ModalTopRightButton } from './styled';

type VoidCallback = () => void;
type VoidPromiseCallback = () => Promise<void>;

interface Props {
  show: boolean;
  slot?: VotingSlot;
  onConfirm: VoidCallback | VoidPromiseCallback;
  onCancel: VoidCallback;
}

export function CheckConfirmModal({ show, slot, onConfirm, onCancel }: Props) {
  const slotDateText = slot?.date.format('YYYY년 MM월 DD일') ?? '';
  const slotMealText = slot?.meal ? getMealLabel(slot.meal) : '';
  const slotDescription = `${slotDateText} ${slotMealText}`;

  const handleClickConfirmButton = () => {
    onConfirm();
  };

  return (
    <CenterContentModal open={show} width={320} height={230}>
      <ConfirmModalContainer>
        <Box>
          <Typography variant="subtitle1" fontWeight={300}>
            모임 날짜를 확정하시겠어요?
          </Typography>
          <Typography variant="subtitle1" fontWeight={300}>
            확정한 날짜는 돌이킬 수 없습니다.
          </Typography>
        </Box>
        <Box style={{ textAlign: 'center', paddingBottom: '8px' }}>
          <Typography variant="h6">{slotDescription}</Typography>
        </Box>
        <CenteredButtonContainer>
          <Button
            variant="contained"
            style={{ width: 200, height: 48 }}
            onClick={handleClickConfirmButton}
          >
            확인
          </Button>
        </CenteredButtonContainer>
        <ModalTopRightButton onClick={onCancel}>
          <CloseIcon />
        </ModalTopRightButton>
      </ConfirmModalContainer>
    </CenterContentModal>
  );
}
