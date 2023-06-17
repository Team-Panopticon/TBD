import { ReactNode } from 'react';
import styled from 'styled-components';

export const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100vh;
  overflow: hidden;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  /* height: 144px; */
  flex: 0;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 16px;
  padding: 32px;
`;

export const ContentsWrapper = styled.div`
  overflow: auto;
  padding: 16px 32px;
  height: 100%;
`;
export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  overflow-y: auto;
`;
export const Contents = ({ children }: { children: ReactNode }) => {
  return (
    <ContentsWrapper>
      <ContentsBox>{children}</ContentsBox>
    </ContentsWrapper>
  );
};

export const Footer = styled.footer`
  height: 56px;
  flex-shrink: 0;
`;
