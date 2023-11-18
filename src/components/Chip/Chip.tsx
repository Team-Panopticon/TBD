import { Tooltip } from '@mui/material';
import { CSSProperties, PropsWithChildren } from 'react';

import { ChipContainer } from './styled';

interface Props {
  className?: string;
  style?: CSSProperties;
  checked?: boolean;
  focus?: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
  onClick?: (checked: boolean) => void;
}

export function Chip(props: PropsWithChildren<Props>) {
  const { className, style, checked, focus, children, showTooltip, tooltipText, onClick } = props;

  return (
    <Tooltip title={tooltipText || ''} open={!!showTooltip} placement="top-start" arrow>
      <ChipContainer
        onClick={() => {
          onClick?.(!checked);
        }}
        checked={checked}
        focus={focus}
        className={className}
        style={style}
      >
        {children}
      </ChipContainer>
    </Tooltip>
  );
}
