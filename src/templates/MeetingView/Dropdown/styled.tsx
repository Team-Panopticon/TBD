import { Button } from '@mui/material';
import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
`;

export const ImageWrapper = styled.button`
  background: none;
  border: 0;
  display: flex;
  width: 25px;
  cursor: pointer;
  img {
    width: 100%;
  }
`;

export const DropdownContentWrapper = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  left: 29px;
  top: 0;
`;

export const DropdownButton = styled(Button)`
  white-space: nowrap;
  padding: 4px 12px;
  color: ${({ theme }) => theme.palette.transPrimary.contrastText};

  &:hover {
    background-color: ${({ theme }) => theme.palette.transPrimary.main};
  }
`;
