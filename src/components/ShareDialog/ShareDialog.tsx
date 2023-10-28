import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Drawer, IconButton, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';

import { MeetingStatus } from '../../constants/meeting';
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

  const name = target?.name || '';
  const id = target?.id || '';
  const confirmedDate = target?.confirmedDateType?.date.toString() || '';
  const status = target?.status || MeetingStatus.inProgress;

  const redirectURL = `${import.meta.env.VITE_ORIGIN_URL}/meetings/${id}/${
    status === MeetingStatus.done ? 'result' : 'vote'
  }`;

  const description =
    status === MeetingStatus.done
      ? `${name}모임 투표를 부탁드려요.`
      : `${name}모임의 날짜가 ${confirmedDate}로 확정되었어요.`;

  const { isError, serviceName, ref, isLoading, setRef } = useKakaoShare({
    title: `${name}모임 투표`,
    description: description,
    redirectURL,
  });
  return (
    <>
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
              copyToClipboard(redirectURL)
                .then(() => {
                  setShowCopySuccessToast(true);
                })
                .catch(() => {
                  alert('복사를 다시 시도해주세요.');
                });
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

const copyToClipboard = (text: string) => {
  // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
  const clipboard = navigator.clipboard;

  if (!clipboard) {
    return Promise.reject();
  }

  return clipboard.writeText(text);
};
