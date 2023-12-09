import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Voting } from '../../apis/votes';
import { Loading } from '../../components/Loading';
import { Page } from '../../components/pageLayout';
import { INPUT_PASSWORD_FINISH_EVENT } from '../../constants/meeting';
import { useMeeting } from '../../hooks/useMeeting';
import { useVotings } from '../../hooks/useVotings';
import { showVoteSuccessPopupState } from '../../stores/showVoteSuccessPopup';
import { votingsState } from '../../stores/voting';
import { InputPasswordModal } from '../../templates/MeetingView/InputPasswordModal';
import MeetingViewContents from '../../templates/MeetingView/MeetingViewContents';
import MeetingViewFooter from '../../templates/MeetingView/MeetingViewFooter';

function MeetingView() {
  const { meeting, meetingId, isFetching: isMeetingFetching } = useMeeting();
  const { votings, isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const [showVoteSuccessPopup, setShowVoteSuccessPopup] = useRecoilState(showVoteSuccessPopupState);

  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

  useEffect(() => {
    if (votings) {
      setVotings(votings);
    }
  }, [meeting, votings, setVotings, meetingId]);

  const handlePasswordModalConfirm = () => {
    dispatchEvent(new CustomEvent(INPUT_PASSWORD_FINISH_EVENT, { detail: true }));
  };

  const handlePasswordModalCancel = () => {
    dispatchEvent(new CustomEvent(INPUT_PASSWORD_FINISH_EVENT, { detail: false }));
    setShowPasswordModal(false);
  };

  if (isFetching) {
    return <Loading />;
  }

  if (!meeting) {
    return null;
  }

  return (
    <Page>
      <MeetingViewContents />
      <MeetingViewFooter />
      <InputPasswordModal
        meetingId={meetingId}
        show={showPasswordModal}
        onConfirm={handlePasswordModalConfirm}
        onCancel={handlePasswordModalCancel}
      />
      <Snackbar
        open={showVoteSuccessPopup}
        autoHideDuration={5000}
        onClose={() => {
          setShowVoteSuccessPopup(false);
        }}
        message="투표해주셔서 감사합니다!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              setShowVoteSuccessPopup(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Page>
  );
}

export default MeetingView;
