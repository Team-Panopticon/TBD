import { ToggleButtonGroup } from '@mui/material';
import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputLabel = styled.label`
  padding-bottom: 4px;
`;

export const CustomTogglebuttonGroup = styled(ToggleButtonGroup)`
  display: flex;
  justify-content: space-between;

  gap: 25px;
`;

export const customButtonStyle: React.CSSProperties = {
  border: '1px solid #D9D9D9',
  borderRadius: '0',
};
