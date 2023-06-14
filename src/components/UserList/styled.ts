import styled from 'styled-components';

import { Chip } from '../Chip/Chip';
export const UserListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StyledChip = styled(Chip)({
  flex: 1,
  minWidth: '80px',
  maxWidth: '120px',
  textAlign: 'center',
  justifyContent: 'center',
  padding: '8px',
});

export const ChipInnerText = styled('div')({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});
