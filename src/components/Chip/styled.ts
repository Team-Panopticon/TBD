import { css, styled } from '@mui/material';

export const ChipContainer = styled.div<{ checked?: boolean; focus?: boolean }>`
  display: inline-flex;
  height: 22px;
  padding: 0 4px;
  align-items: center;
  box-shadow: ${({ focus }) => (focus ? `inset 0 0 0 2px #009568` : `none`)};

  &:hover {
    cursor: pointer;
  }

  ${(props) => {
    const {
      checked,
      theme: {
        palette: { primary, secondary },
      },
    } = props;

    if (checked) {
      return css`
        background-color: ${primary.main};
        color: white;
      `;
    }

    return css`
      background-color: ${secondary.main};
    `;
  }};
`;
