import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Drawer, IconButton, Input, Snackbar, Typography } from '@mui/material';
import { useRef, useState } from 'react';

import { useKakaoShare } from '../../hooks/useKakaoShare';
import useShare from '../../hooks/useShare';
import { KakaoIcon } from '../IconComponent/KakaoIcon';
import { Flex, FlexVertical } from '../styled';

export function ShareDialog() {
  const { show, closeShare, target } = useShare();
  const [showCopySuccessToast, setShowCopySuccessToast] = useState(false);

  const iconProps = {
    width: 48,
    height: 48,
  };

  const copyUrlRef = useRef<HTMLInputElement>(null);

  const name = target?.name || '';

  const { isError, serviceName, ref, isLoading, setRef } = useKakaoShare({
    title: `${name}모임 투표`,
    description: `${name}모임 투표를 부탁드려요.`,
    meetingId: target?.id || '',
  });

  const copyUrl = () => {
    if (copyUrlRef.current) {
      const copyUrlEl = copyUrlRef.current;
      copyUrlEl.focus();
      copyUrlEl.setSelectionRange(0, copyUrlEl.value.length);
      try {
        document.execCommand('copy');
        copyUrlEl.blur();
      } catch (e) {
        console.log('Share Dialog >> Copy Failed', e);
      }
    }
  };

  return (
    <>
      <Drawer anchor="bottom" open={show} onClose={closeShare}>
        <Flex
          paddingX={2}
          paddingTop={2}
          paddingBottom={1}
          alignItems="center"
          justifyContent={'space-between'}
        >
          <Typography style={{ whiteSpace: 'nowrap' }}>공유하기</Typography>
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
        <Flex paddingX={1}>
          <Input
            inputRef={copyUrlRef}
            autoComplete="off"
            size="small"
            fullWidth={true}
            disableUnderline={true}
            value={window.location.href}
            style={{ margin: '0 8px' }}
          ></Input>
        </Flex>
        <Flex justifyContent={'space-around'} padding={1}>
          <FlexVertical
            alignItems={'center'}
            padding={1}
            onClick={() => {
              copyUrl();
              closeShare();
            }}
          >
            <Flex flex={1} padding={1} alignItems={'center'}>
              <ContentCopyIcon style={{ ...iconProps }} />
            </Flex>
            <Typography>주소복사</Typography>
          </FlexVertical>

          <FlexVertical ref={setRef} alignItems={'center'} padding={1}>
            <Flex flex={1} padding={1} justifyContent="center" alignItems={'center'}>
              <KakaoIcon {...iconProps} />
            </Flex>
            {/* {isLoading && <Typography>로딩중</Typography>} */}
            <Typography>카카오톡</Typography>
          </FlexVertical>

          {/* <KakaoShareButton meeting={target} /> */}
        </Flex>
      </Drawer>
      <Snackbar
        open={showCopySuccessToast}
        autoHideDuration={2000}
        onClose={() => {
          setShowCopySuccessToast(false);
        }}
        message="클립보드에 복사되었습니다."
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              setShowCopySuccessToast(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </>
  );
}
