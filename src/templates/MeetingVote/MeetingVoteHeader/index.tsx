import Typography from '@mui/material/Typography';

import WritingHands from '../../../assets/writing.svg';
import { FlexVertical } from '../../../components/styled';
import { useMeetingVoteHeader } from '../../../hooks/MeetingVote/useMeetingVoteHeader';
import { PrimaryBold } from '../../MeetingView/styled';

const MeetingVoteHeader = () => {
  const { currentUser } = useMeetingVoteHeader();

  return (
    <FlexVertical flex={1} alignItems={'center'} gap={1}>
      <FlexVertical flex={1} gap={1} width={'100%'}>
        <FlexVertical alignItems={'center'}>
          <img height={110} src={WritingHands} alt="" />
        </FlexVertical>
        <FlexVertical>
          {currentUser ? (
            <Typography variant="h6" fontWeight={400} align="center">
              <PrimaryBold className="primary-bold">{currentUser.username}</PrimaryBold>님의 투표를
              수정합니다
            </Typography>
          ) : (
            <Typography
              variant="h6"
              fontWeight={400}
              style={{ wordBreak: 'keep-all' }}
              align="center"
            >
              투표하신 적이 있으면 참석자 목록에서 아이디를 눌러주세요
            </Typography>
          )}
        </FlexVertical>
      </FlexVertical>
    </FlexVertical>
  );
};

export default MeetingVoteHeader;
