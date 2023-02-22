import React, { CSSProperties, PropsWithChildren } from 'react';

import { ChipContainer } from './styled';

interface Props {
  className?: string;
  style?: CSSProperties;
  checked?: boolean;
  focus?: boolean;
  onClick?: (checked: boolean) => void;
}

export function Chip(props: PropsWithChildren<Props>) {
  const { className, style, checked, focus, children, onClick } = props;

  return (
    <div className={className} style={style}>
      <ChipContainer
        onClick={() => {
          onClick?.(!checked);
        }}
        checked={checked}
        focus={focus}
      >
        {children}
      </ChipContainer>
    </div>
  );
}
