import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface VotePageButtonProps {
  meetingId: string;
  isLoggedIn: boolean;
}

export function VotePageButton({ meetingId, isLoggedIn }: VotePageButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      color="primary"
      onClick={() => {
        navigate(`/meetings/${meetingId}/vote`);
      }}
    >
      {isLoggedIn ? '다시 투표하러 가기' : '투표하러 가기'}
    </Button>
  );
}
