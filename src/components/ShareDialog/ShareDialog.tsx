import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Drawer, IconButton, Typography } from '@mui/material';

import useShare from '../../hooks/useShare';
import { KakaoIcon } from '../IconComponent/KakaoIcon';
import { Flex, FlexVertical } from '../styled';

export function ShareDialog() {
  const { show, closeShare } = useShare();
  const iconProps = {
    width: 24,
    height: 24,
  };
  return (
    <Drawer anchor="bottom" open={show} onClose={closeShare}>
      <Flex padding={2} alignItems="center" justifyContent={'space-between'}>
        <Typography>공유하기</Typography>
        <IconButton
          aria-label="close"
          onClick={closeShare}
          sx={{
            padding: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Flex>
      <Flex justifyContent={'space-around'} padding={1}>
        <FlexVertical
          alignItems={'center'}
          padding={1}
          onClick={() => {
            doCopy(window.location.href);
            closeShare();
          }}
        >
          <Flex flex={1} padding={1} alignItems={'center'}>
            <ContentCopyIcon style={{ ...iconProps }} />
          </Flex>
          <Typography>주소복사</Typography>
        </FlexVertical>

        <FlexVertical
          alignItems={'center'}
          padding={1}
          onClick={() => {
            doCopy(window.location.href);
            closeShare();
          }}
        >
          <Flex flex={1} padding={1} alignItems={'center'}>
            <KakaoIcon {...iconProps} />
          </Flex>
          <Typography>주소복사</Typography>
        </FlexVertical>
      </Flex>
    </Drawer>
  );
}

const doCopy = (text: string) => {
  // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
  const clipboard = navigator.clipboard;

  if (clipboard) {
    clipboard
      .writeText(text)
      .then(() => {
        alert('클립보드에 복사되었습니다.');
      })
      .catch(() => {
        alert('복사를 다시 시도해주세요.');
      });
  }
};
