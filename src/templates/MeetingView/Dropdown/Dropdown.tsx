import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import React from 'react';
import { NavLink } from 'react-router-dom';

import logo_nobg from '../../../assets/round.png';
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
  menuList?: IMenu[];
}

export function Dropdown(props: Props) {
  const { show, setShow, menuList } = props;

  return (
    <div style={{ width: 0 }}>
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
          alignItems={'center'}
          gap={1}
        >
          <img
            src={logo_nobg}
            alt="로고"
            style={{
              width: 'auto',
              height: '28px',
            }}
          />
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" fontWeight={600} color="black">
              {/* Todo: logo로 변경 */}
              Motoo.day
            </Typography>
          </NavLink>
        </Flex>
        <Flex
          paddingX={1}
          paddingBottom={1}
          alignItems="flex-start"
          flexDirection={'column'}
          justifyContent={'space-between'}
        >
          {menuList?.map((menu) => {
            return (
              <DropdownButton
                key={menu.name}
                color="transPrimary"
                onClick={(event) => {
                  event.stopPropagation();
                  setTimeout(() => {
                    setShow(false);
                  }, 100);
                  menu.onClick();
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
    </div>
  );
}
