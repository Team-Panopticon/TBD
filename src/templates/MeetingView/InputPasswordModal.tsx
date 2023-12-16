import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { issuePrivateMeetingAdminToken } from '../../apis/meetings';
import { CenterContentModal } from '../../components/CenterContentModal';
import { MaskingInput } from '../../components/MaskingInput';
import { adminTokenStateFamily } from '../../stores/adminToken';
import { validatePassword } from '../../stores/createMeeting';
import { MaskingInputContainer, PasswordInput } from '../MeetingEdit/styled';
import { ModalTopRightButton } from './styled';

interface Props {
  meetingId: string;
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 비밀번호 입력 모달창
 * - 비밀번호 입력과 유효성 검증
 * - 비밀번호 입력 완료 시 token 발급 요청
 */
export function InputPasswordModal({ meetingId, show, onConfirm, onCancel }: Props) {
  const [password, setPassword] = useState<string>('');
  const setAdminToken = useSetRecoilState(adminTokenStateFamily(meetingId));
  const { mutate } = useMutation({
    mutationFn: issuePrivateMeetingAdminToken,
    onSuccess: (adminToken) => {
      setAdminToken(adminToken);
      onConfirm();
    },
    onError: () => {
      // TODO: password 틀림을 표시 UI 효과
      setPassword('');
    },
  });

  const handlePasswordChange = (newPassword: string) => {
    if (newPassword.length >= 4) {
      const isPasswordValid = validatePassword(newPassword);
      if (!isPasswordValid) {
        // TODO: password 틀림을 표시 UI 효과
        setPassword('');
        return;
      }
    }

    setPassword(newPassword);
  };

  const handleClickCancelButton = () => {
    setPassword('');
    onCancel();
  };

  useEffect(() => {
    if (password.length === 4) {
      mutate({ meetingId, password });
    }
  }, [meetingId, password, mutate]);

  return (
    <CenterContentModal open={show} width={320} height={180}>
      <PasswordInput>
        <Typography variant="subtitle1" fontWeight={300}>
          비밀번호를 입력해주세요.
        </Typography>
        <ModalTopRightButton onClick={handleClickCancelButton}>
          <CloseIcon />
        </ModalTopRightButton>
        <MaskingInputContainer>
          <MaskingInput
            length={4}
            text={password}
            setText={handlePasswordChange}
            size={30}
            style={{ paddingBottom: 10 }}
          />
        </MaskingInputContainer>
      </PasswordInput>
    </CenterContentModal>
  );
}
