import React, { useEffect, useState } from 'react';

import GearImage from '../../../images/gear.png';
import { DropdownButton, DropdownContainer, DropdownContentWrapper, ImageWrapper } from './styled';

interface Props {
  onClickConfirmButton: () => void;
  onClickEditButton: () => void;
}

export function Dropdown(props: Props) {
  const { onClickConfirmButton, onClickEditButton } = props;

  const [isShow, setShow] = useState(false);

  useEffect(() => {
    if (isShow) {
      return;
    }
    const handleCloseDropdown = () => setShow(false);

    document.body.addEventListener('click', handleCloseDropdown);

    return () => {
      document.body.removeEventListener('click', handleCloseDropdown);
    };
  }, [isShow]);

  return (
    <DropdownContainer>
      <ImageWrapper
        onClick={(event) => {
          event.stopPropagation();
          setShow((prev) => !prev);
        }}
      >
        <img src={GearImage} alt="드롭다운 버튼" />
      </ImageWrapper>
      {isShow && (
        <DropdownContentWrapper>
          <DropdownButton
            color="transPrimary"
            onClick={(event) => {
              event.stopPropagation();
              onClickEditButton();
              setShow(false);
            }}
          >
            수정하기
          </DropdownButton>
          <DropdownButton
            color="transPrimary"
            onClick={(event) => {
              event.stopPropagation();
              onClickConfirmButton();
              setShow(false);
            }}
          >
            확정하기
          </DropdownButton>
        </DropdownContentWrapper>
      )}
    </DropdownContainer>
  );
}
