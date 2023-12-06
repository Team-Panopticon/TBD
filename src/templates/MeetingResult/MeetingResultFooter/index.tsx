import { Button } from '@mui/material';

import { Footer } from '../../../components/pageLayout';
import { FullHeightButtonGroup } from '../../../components/styled';
import { useMeetingResultFooter } from '../../../hooks/MeetingResult/useMeetingResultFooter';

const MeetingResultFooter = () => {
  const { meeting, navigate, openShare } = useMeetingResultFooter();

  return (
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
            meeting?.id && navigate(`/meetings/${meeting?.id}`);
          }}
        >
          상세보기
        </Button>
        <Button
          onClick={() => {
            openShare();
          }}
        >
          공유
        </Button>
      </FullHeightButtonGroup>
    </Footer>
  );
};

export default MeetingResultFooter;
