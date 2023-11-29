import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

export const FullHeightButtonGroup = styled(ButtonGroup)`
  height: 100%;

  & .MuiButton-root {
    height: 100%;
    border-radius: 0;
    font-weight: 500;
  }
  /* ButtonGroup 컴포넌트의 borderRight 기본 스타일을 diable 하기 위하여 스타일 추가 */
  & :not(:last-child) {
    border-right: 0 !important;
  }
`;

export const Flex = styled(Box)`
  display: flex;
`;

export const FlexVertical = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const CalanderDay = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '36px',
  height: '36px',
  textAlign: 'center',
  lineHeight: '16px',
});

export const CalanderDayBtn = styled('button')<{ today?: boolean; isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 0;
  background: 0;
  padding: 0;
  position: relative;

  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;

  &::after {
    content: '오늘';
    display: ${(props) => (props.today ? 'flex' : 'none')};
    position: absolute;
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    bottom: -14px;
    color: ${(props) => props.theme.palette.text.primary};
  }
  ${(props) =>
    props.isSelected && {
      color: 'white',
      fontWeight: 600,
      backgroundColor: props.theme.palette.primary.main,
      borderRadius: '20%',
    }}
`;

export const CalanderWeek = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '16px',
});

export const CalanderContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});
export const CalenderWrapper = styled('div')({
  padding: '0px 0px 32px',
  flex: 1,
  width: '100%',
});
