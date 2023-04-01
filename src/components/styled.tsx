import { ButtonGroup } from '@mui/material';
import styled from 'styled-components';

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