import { ToggleButtonGroup } from '@mui/material';
import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 32px;
  padding-right: 32px;
`;

export const InputLabel = styled.label`
  padding-bottom: 4px;
`;

export const CustomTogglebuttonGroup = styled(ToggleButtonGroup)({
  display: 'flex',
  justifyContent: 'space-between',

  gap: '25px',
});

export const customButtonStyle = {
  border: '1px solid #D9D9D9',
  borderRadius: '0',
};
