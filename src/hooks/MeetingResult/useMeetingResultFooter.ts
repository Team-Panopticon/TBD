import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMeeting } from '../useMeeting';
import useShare from '../useShare';

export const useMeetingResultFooter = () => {
  const { meeting, isLoading } = useMeeting();
  const navigate = useNavigate();
  const { openShare, setTarget } = useShare();

  useEffect(() => {
    if (!isLoading && meeting) {
      setTarget(meeting);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return {
    meeting,
    navigate,
    openShare,
  };
};
