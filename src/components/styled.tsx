import { Box, ButtonGroup, styled } from '@mui/material';

export const FullHeightButtonGroup = styled(ButtonGroup)`
  height: 100%;
  display: flex;
  column-gap: 16px;
  & .MuiButton-root {
    height: 100%;
    /** ButtonGroup 컴포넌트의 top-right / bottom-right radius 0 설정을 무시하기 위하여 important 추가 */
    border-radius: 8px !important;
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
