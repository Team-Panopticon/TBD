import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { SECONDARY_COLOR } from '../theme';
import { FlexVertical } from './styled';

const commonStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '105px',
  height: '30px',
  fontSize: '12px',
  marginTop: '8px',
};

const MeetingContentsSkeleton = () => {
  return (
    <div style={{ flex: '1' }}>
      <FlexVertical gap={0.5} style={{ padding: '8px 0' }}>
        <div>
          <Typography fontWeight={500} variant="caption" color="primary">
            투표현황
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
      <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ ...commonStyle, flex: '1', marginTop: '0px' }}>
            <Skeleton height="100%" width="100%" variant="rounded" />
          </div>
          <div style={{ borderRight: `1px solid ${SECONDARY_COLOR}` }} />
          <div style={{ ...commonStyle, flex: '1', marginTop: '0px' }}>
            <Skeleton height="100%" width="100%" variant="rounded" />
          </div>
        </div>
        <div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px' }}>
              <div style={{ ...commonStyle, flex: '1' }}>
                <Skeleton height="100%" width="100%" variant="rounded" />
              </div>
              <div style={{ borderRight: `1px solid ${SECONDARY_COLOR}` }} />
              <div style={{ ...commonStyle, flex: '1' }}>
                <Skeleton height="100%" width="100%" variant="rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingContentsSkeleton;
