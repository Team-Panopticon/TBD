import { styled } from '@mui/material';
import { useEffect, useRef } from 'react';

interface DotProps {
  filled: boolean;
  size: number;
}
const Flex = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  fontSize: '16px',
  color: '#000',
  cursor: 'pointer',
});

const Dot = styled('div')<DotProps>((props) => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderRadius: '50%',
  backgroundColor: props.filled ? props.theme.palette.primary.main : '#d9d9d9',
}));

const HiddenInput = styled('input')({
  opacity: 0,
  position: 'absolute',
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
});

interface MaskingInputProps {
  style?: React.CSSProperties;
  length: number;
  text: string;
  setText: (newText: string) => void;
  size: number;
}
export function MaskingInput({ style, length, text, setText, size }: MaskingInputProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filledLength = e.target.value.length;
    if (filledLength > length) {
      return;
    }
    setText(e.target.value);
    if (filledLength === length) {
      return e.target.blur();
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div style={style}>
      <Flex onClick={handleClick}>
        {getDots(length, text.length).map((dot, index) => (
          <Dot key={index} filled={dot} size={size} />
        ))}
      </Flex>
      <HiddenInput
        inputMode="numeric"
        ref={inputRef}
        type="number"
        value={text}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
}

export function getDots(totalLength: number, textLength: number) {
  return new Array(totalLength).fill(false).map((_, index) => index < textLength);
}
