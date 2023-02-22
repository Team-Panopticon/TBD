import { useRef, useState } from 'react';
import styled from 'styled-components';

interface IDotProps {
  filled: boolean;
  size: number;
}
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 16px;
  color: #000;
  cursor: pointer;
`;
const Dot = styled.div<IDotProps>`
  ${({ size }) => `width: ${size}px; height: ${size}px;`}
  border-radius: 50%;
  background-color: #d9d9d9;
  ${({ filled, theme }) => filled && `background-color: ${theme.palette.primary.main};`}
  margin-right: 8px;
`;

const HiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;
interface IMaskingInputProps {
  style?: React.CSSProperties;
  length: number;
  text: string;
  setText: (newText: string) => void;
  size: number;
}
export function MaskingInput({ style, length, text, setText, size }: IMaskingInputProps) {
  const [dots, setDots] = useState<boolean[]>(new Array(length).fill(false));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filledLength = e.target.value.length;
    if (filledLength > length) {
      return;
    }
    setText(e.target.value);
    setDots(new Array(length).fill(false).map((_, index) => index < filledLength));
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.focus();
  };
  return (
    <div style={style}>
      <Flex onClick={handleClick}>
        {dots.map((dot, index) => (
          <Dot key={index} filled={dot} size={size} />
        ))}
      </Flex>
      <HiddenInput
        inputMode="numeric"
        ref={inputRef}
        type="number"
        value={text}
        onChange={onChange}
      />
    </div>
  );
}
