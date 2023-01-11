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
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 16px;
  padding: 32px;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
`;

export const Footer = styled.footer`
  height: 56px;
`;
