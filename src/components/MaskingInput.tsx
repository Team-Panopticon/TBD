import { useRef, useState } from 'react';
import styled from 'styled-components';

interface IDotProps {
  filled: boolean;
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
  margin: 16px;
`;
const Dot = styled.div<IDotProps>`
  width: 16px;
  height: 16px;
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
  length: number;
}
export function MaskingInput({ length }: IMaskingInputProps) {
  const [dots, setDots] = useState<boolean[]>(new Array(length).fill(false));
  const [text, setText] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > length) return;
    setText(e.target.value);
    setDots(new Array(length).fill(false).map((_, index) => index < e.target.value.length));
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.focus();
  };
  return (
    <>
      <Flex onClick={handleClick}>
        {dots.map((dot, index) => (
          <Dot key={index} filled={dot} />
        ))}
      </Flex>
      <HiddenInput ref={inputRef} type="text" value={text} onChange={onChange} />
    </>
  );
}
