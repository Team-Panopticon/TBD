import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Flex } from '../../../components/styled';
import { DropdownButton } from './styled';

interface IMenu {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}
interface Props {
  onClickConfirmButton?: () => Promise<void>;
  onClickEditButton?: () => Promise<void>;
  show: boolean;
  setShow: (show: boolean) => void;
  munuList?: IMenu[];
}

export function Dropdown(props: Props) {
  const { onClickConfirmButton, onClickEditButton, show, setShow, munuList } = props;

  return (
    <div style={{ width: 0 }}>
      {
        <Drawer
          onClose={() => {
            setShow(false);
          }}
          open={show}
          anchor="right"
        >
          <Flex
            minWidth={200}
            paddingX={2}
            paddingTop={2}
            paddingBottom={1}
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Typography variant="h5" fontWeight={600}>
              설정
            </Typography>
          </Flex>
          <Flex
            paddingX={1}
            paddingBottom={1}
            alignItems="flex-start"
            flexDirection={'column'}
            justifyContent={'space-between'}
          >
            {munuList?.map((menu) => {
              return (
                <DropdownButton
                  key={menu.name}
                  color="transPrimary"
                  onClick={(event) => {
                    event.stopPropagation();
                    menu.onClick();
                    setShow(false);
                  }}
                >
                  {menu.icon}
                  <Typography variant="subtitle1" fontWeight={700}>
                    {menu.name}
                  </Typography>
                </DropdownButton>
              );
            })}
          </Flex>
        </Drawer>
      }
    </div>
  );
}
