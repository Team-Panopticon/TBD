import Button from '@mui/material/Button';

import { Footer } from '../../../components/pageLayout';
import { FullHeightButtonGroup } from '../../../components/styled';
import { useMeetingVoteFooter } from '../../../hooks/MeetingVote/useMeetingVoteFooter';
import { InputUsernameModal } from '../../MeetingView/InputUsernameModal';

const MeetingVoteFooter = () => {
  const {
    meetingId,
    userList,
    showUsernameModal,
    setShowUsernameModal,
    navigate,
    handleClickVote,
    handleUsernameConfirm,
  } = useMeetingVoteFooter();

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
            다음에
          </Button>
          <Button
            onClick={() => {
              handleClickVote();
            }}
          >
            투표
          </Button>
        </FullHeightButtonGroup>
      </Footer>
      <InputUsernameModal
        show={showUsernameModal}
        usernameList={userList.map((user) => user.username)}
        onConfirm={handleUsernameConfirm}
        onCancel={() => setShowUsernameModal(false)}
      />
    </>
  );
};

export default MeetingVoteFooter;
