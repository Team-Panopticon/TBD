import React from 'react';

import { useKakaoShare } from '../hooks/useKakaoShare';
import { ShareButton } from './ShareButton';

export const KakaoShareButton = () => {
  const { isError, serviceName, ref } = useKakaoShare({
    title: 'XXX 모임 투표',
    description: '모임 투표를 부탁드려요.',
  });

  return <ShareButton isError={isError} serviceName={serviceName} ref={ref} />;
};
