import styled, { css } from 'styled-components';

export const VoteTableContainer = styled.div``;

export const Header = styled.div`
  display: flex;
  gap: 8px;
`;

export const ContentWrapper = styled.div``;

const commonStyle = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 30px;
  font-size: 12px;
  margin-bottom: 8px;
`;

export const HeaderBox = styled.div`
  ${commonStyle}
  font-weight: 700;
  background-color: ${({ theme }) => theme.palette.secondary.main};
`;

export const DateContentBox = styled.div`
  ${commonStyle}
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
`;

export const ContentBox = styled.button<{
  checked?: boolean;
  focus?: boolean;
  progress: number;
  isHideVotingStatus: boolean;
}>`
  position: relative;
  color: ${({ progress, isHideVotingStatus }) =>
    progress >= 80 && !isHideVotingStatus ? 'white' : 'black'};
  ${commonStyle}
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
  cursor: pointer;
  box-shadow: ${({ focus }) => (focus ? `inset 0 0 0 2px #009568` : `none`)};

  > span {
    z-index: 10;
  }

  ${(props) => {
    const {
      checked,
      theme: {
        palette: { primary },
      },
    } = props;

    if (checked) {
      return css`
        background-color: ${primary.main};
        border: 1px solid ${primary.main};
        color: white;
      `;
    }
  }};
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 8px;

  &:last-child {
    button,
    div {
      margin-bottom: 0;
    }
  }
`;

export const Divider = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
`;

export const OpacityProgress = styled.div<{ progress: number; isHide: boolean }>`
  display: ${({ isHide }) => (isHide ? 'none' : 'block')};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: ${({ theme }) => theme.palette.primary.main};
  opacity: ${({ progress }) => `${progress}%`};
  width: 100%;
  height: 100%;
`;
