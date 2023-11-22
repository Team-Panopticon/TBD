import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ResultPageButtonProps {
  meetingId: string;
}

export function ResultPageButton({ meetingId }: ResultPageButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      color="primary"
      onClick={() => {
        navigate(`/meetings/${meetingId}/result`);
      }}
    >
      {'날짜 확인'}
    </Button>
  );
}
