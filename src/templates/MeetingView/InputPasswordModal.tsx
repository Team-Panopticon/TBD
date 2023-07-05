import { Close as CloseIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { CenterContentModal } from '../../components/CenterContentModal';
import { MaskingInput } from '../../components/MaskingInput';
import { adminTokenState } from '../../stores/adminToken';
import { validatePassword } from '../../stores/createMeeting';
import { MaskingInputContainer, PasswordInput } from '../MeetingEdit/styled';
import { ModalTopRightButton } from './styled';

interface Props {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 비밀번호 입력 모달창
 * - 비밀번호 입력과 유효성 검증
 * - 비밀번호 입력 완료 시 token 발급 요청
 */
export function InputPasswordModal({ show, onConfirm, onCancel }: Props) {
  const [password, setPassword] = useState<string>('');
  const setAdminToken = useSetRecoilState(adminTokenState);

  const handlePasswordChange = (newPassword: string) => {
    if (newPassword.length >= 4) {
      const isPasswordValid = validatePassword(newPassword);
      if (!isPasswordValid) {
        // TODO: password 틀림을 표시 UI 효과
        setPassword('');
        return;
      }

      // TODO: token 발급 API 호출
      const sampleToken = 'sampleToken';
      setAdminToken(sampleToken);
      // TODO: token 발급 성공 시 onConfirm 호출
      onConfirm();
      // TODO: token 발급 실패 시 password 틀림을 표시 UI 효과
    }

    setPassword(newPassword);
  };

  return (
    <CenterContentModal open={show} width={320} height={230}>
      <PasswordInput>
        <Typography variant="subtitle1" fontWeight={300}>
          비밀번호를 입력해주세요.
        </Typography>
        <ModalTopRightButton onClick={onCancel}>
          <CloseIcon />
        </ModalTopRightButton>
        <MaskingInputContainer>
          <MaskingInput
            length={4}
            text={password}
            setText={handlePasswordChange}
            size={28}
            style={{ paddingTop: 10 }}
          />
        </MaskingInputContainer>
      </PasswordInput>
    </CenterContentModal>
  );
}
