import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Zoom } from '@mui/material';

import { BottomFABContainer, BottomFloatingActionButton } from './styled';

interface ScrollDownFloatingButtonProps {
  show: boolean;
  onClick: () => void;
}

export function ScrollDownFloatingButton({ onClick, show }: ScrollDownFloatingButtonProps) {
  return (
    <Zoom in={show}>
      <BottomFABContainer>
        <BottomFloatingActionButton size="medium" color="primary" onClick={onClick}>
          <KeyboardDoubleArrowDownIcon />
        </BottomFloatingActionButton>
      </BottomFABContainer>
    </Zoom>
  );
}
