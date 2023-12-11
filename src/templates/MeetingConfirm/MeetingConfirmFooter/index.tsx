import { Button } from '@mui/material';

import { VotingSlot } from '../../../apis/votes';
import { Footer } from '../../../components/pageLayout';
import { FullHeightButtonGroup } from '../../../components/styled';
import { useMeetingConfirmFooter } from '../../../hooks/MeetingConfirm/useMeetingConfirmFooter';
import { CheckConfirmModal } from '../../MeetingView/CheckConfirmModal';

interface Props {
  selectedSlot?: VotingSlot;
}

const MeetingConfirmFooter = ({ selectedSlot }: Props) => {
  const { meetingId, showConfirmModal, navigate, handleConfirm, setShowConfirmModal } =
    useMeetingConfirmFooter(selectedSlot);

  return (
    <>
      <Footer>
        <FullHeightButtonGroup
          fullWidth
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            color="secondary"
            onClick={() => {
              navigate(`/meetings/${meetingId}`);
            }}
          >
            취소
          </Button>
          <Button
            color="primary"
            disabled={!selectedSlot}
            onClick={() => {
              setShowConfirmModal(true);
            }}
          >
            모임 확정
          </Button>
        </FullHeightButtonGroup>
      </Footer>
      <CheckConfirmModal
        show={showConfirmModal}
        slot={selectedSlot}
        onConfirm={handleConfirm}
        onCancel={() => {
          setShowConfirmModal(false);
        }}
      />
    </>
  );
};

export default MeetingConfirmFooter;
