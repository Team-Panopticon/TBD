import React, { useRef } from 'react';

import { useKakaoShare } from '../hooks/useKakaoShare';
import { ShareButton } from './ShareButton';

export const KakaoShareButton = () => {
  const ref = useRef<HTMLAnchorElement>(null);

  const { isError, serviceName } = useKakaoShare({
    ref,
    title: 'XXX 모임 투표',
    description: '모임 투표를 부탁드려요.',
    url: 'https//localhost:5173',
  });

  return <ShareButton isError={isError} serviceName={serviceName} ref={ref} />;
};
