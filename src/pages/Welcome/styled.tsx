import { styled } from '@mui/material/styles';

export const WelcomeHeaderContainer = styled('div')`
  background-color: ${({ theme }) => theme.palette.primary.main};
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainImageContainer = styled('section')`
  background-color: ${({ theme }) => theme.palette.primary.main};
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HowToContainer = styled('section')`
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;

export const WelcomeContents = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
