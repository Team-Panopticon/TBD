import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Zoom } from '@mui/material';

import { BottomRightFloatingActionButton } from './styled';

interface ScrollDownFloatingButtonProps {
  show: boolean;
  onClick: () => void;
}

export function ScrollDownFloatingButton({ onClick, show }: ScrollDownFloatingButtonProps) {
  return (
    <Zoom in={show}>
      <BottomRightFloatingActionButton size="medium" color="primary" onClick={onClick}>
        <KeyboardDoubleArrowDownIcon />
      </BottomRightFloatingActionButton>
    </Zoom>
  );
}
