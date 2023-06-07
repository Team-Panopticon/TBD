import styled from 'styled-components';

export const Page = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 144px;
  flex: 0;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 8px;
  padding: 32px;

  h1 {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  overflow-y: auto;
`;

export const Footer = styled.footer`
  height: 56px;
  flex-shrink: 0;
`;
