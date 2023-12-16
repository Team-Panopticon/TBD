import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import React from 'react';

import { FlexVertical } from '../../../components/styled';

const MeetingResultContentsSkeleton = () => {
  return (
    <FlexVertical gap={1}>
      <FlexVertical gap={0.5}>
        <div>
          <Typography fontWeight={500} variant="caption" color="primary">
            올 수 있는 사람들
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width="100px" variant="rounded" />
            ))}
          </div>
        </div>
      </FlexVertical>
      <FlexVertical gap={0.5}>
        <div>
          <Typography fontWeight={500} variant="caption" color="secondary">
            아쉽지만 못오는 사람들
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width="100px" variant="rounded" />
            ))}
          </div>
        </div>
      </FlexVertical>
    </FlexVertical>
  );
};

export default MeetingResultContentsSkeleton;
