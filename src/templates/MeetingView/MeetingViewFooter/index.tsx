import Button from '@mui/material/Button';

import { ResultPageButton } from '../../../components/buttons/ResultPageButton';
import { VotePageButton } from '../../../components/buttons/VotePageButton';
import { Footer } from '../../../components/pageLayout';
import { FullHeightButtonGroup } from '../../../components/styled';
import { MeetingStatus } from '../../../constants/meeting';
import { useMeetingViewFooter } from '../../../hooks/MeetingView/useMeetingViewFooter';

const MeetingViewFooter = () => {
  const { meeting, meetingId, openShare, currentUser } = useMeetingViewFooter();

  return (
    <Footer>
      <FullHeightButtonGroup
        fullWidth
        disableElevation
        variant="contained"
        aria-label="Disabled elevation buttons"
      >
        {meeting?.status === MeetingStatus.inProgress ? (
          <VotePageButton meetingId={meetingId} isLoggedIn={!!currentUser?.username} />
        ) : (
          <ResultPageButton meetingId={meetingId} />
        )}
        <Button
          color="transPrimary"
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

export default MeetingViewFooter;
