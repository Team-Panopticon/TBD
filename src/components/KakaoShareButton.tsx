import React from 'react';

import { Meeting } from '../apis/types';
import { useKakaoShare } from '../hooks/useKakaoShare';
import { ShareButton } from './ShareButton';

export const KakaoShareButton = ({ meeting }: { meeting?: Meeting }) => {
  const name = meeting?.name || '';

  const { isError, serviceName, ref } = useKakaoShare({
    title: `${name}모임 투표`,
    description: `${name}모임 투표를 부탁드려요.`,
    meetingId: meeting?.id || '',
  });

  return <ShareButton isError={isError} serviceName={serviceName} ref={ref} />;
};
