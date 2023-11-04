import { EditCalendar } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Drawer, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Flex } from '../../../components/styled';
import { DropdownButton, DropdownContainer, ImageWrapper } from './styled';
interface Props {
  onClickConfirmButton: () => Promise<void>;
  onClickEditButton: () => Promise<void>;
}

export function Dropdown(props: Props) {
  const { onClickConfirmButton, onClickEditButton } = props;

  const [isShow, setShow] = useState(false);

  useEffect(() => {
    if (!isShow) {
      return;
    }
    const handleCloseDropdown = () => setShow(false);

    document.body.addEventListener('click', handleCloseDropdown);

    return () => {
      document.body.removeEventListener('click', handleCloseDropdown);
    };
  }, [isShow]);

  return (
    <div style={{ width: 0 }}>
      <DropdownContainer>
        <ImageWrapper
          onClick={(event) => {
            event.stopPropagation();
            setShow((prev) => !prev);
          }}
        >
          <SettingsRoundedIcon></SettingsRoundedIcon>
        </ImageWrapper>
      </DropdownContainer>
      {
        <Drawer
          onClose={() => {
            setShow(() => false);
          }}
          open={isShow}
          anchor="bottom"
        >
          <Flex
            paddingX={2}
            paddingTop={2}
            paddingBottom={1}
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Typography variant="h6" fontWeight={700}>
              설정
            </Typography>
            <CloseIcon />
          </Flex>
          <Flex
            paddingX={1}
            paddingBottom={1}
            alignItems="flex-start"
            flexDirection={'column'}
            justifyContent={'space-between'}
          >
            <DropdownButton
              color="transPrimary"
              onClick={(event) => {
                event.stopPropagation();
                onClickEditButton();
                setShow(false);
              }}
            >
              <EditCalendar />
              <Typography variant="subtitle1" fontWeight={700}>
                수정하기
              </Typography>
            </DropdownButton>
            <hr
              style={{
                width: '100%',
                border: '0 0.2px 0',
              }}
            ></hr>
            <DropdownButton
              color="transPrimary"
              onClick={(event) => {
                event.stopPropagation();
                onClickConfirmButton();
                setShow(false);
              }}
            >
              <EventAvailableIcon />
              <Typography variant="subtitle1" fontWeight={700}>
                확정하기
              </Typography>
            </DropdownButton>
          </Flex>
        </Drawer>
      }
    </div>
  );
}
