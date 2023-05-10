import { Button, Modal, Typography } from '@mui/material';

import { MaskingInput } from '../../components/MaskingInput';
import { FullHeightButtonGroup } from '../../components/styled';
import { validatePassword } from '../../stores/createMeeting';
import {
  MaskingInputContainer,
  PasswordContainer,
  PasswordContent,
  PasswordInput,
  PasswordSkipBtn,
} from './styled';

interface Props {
  show: boolean;
  password?: string;
  onChange: (newPassword: string) => void;
  onConfirm: (setPassword: boolean) => Promise<void>;
  onCancel: () => void;
}

/**
 * 비밀번호 생성 모달창
 * - 비밀번호 유효성 검증과 표시
 * - 버튼 클릭에 따라서 비밀번호를 인자로 onConfirm handler 호출
 */
export function InputPasswordModal({ show, password, onChange, onConfirm, onCancel }: Props) {
  const isPasswordValid = password !== undefined && validatePassword(password);

  const handleSkip = () => {
    onConfirm(false);
  };

  const handleSubmit = () => {
    onConfirm(true);
  };

  return (
    <>
      <Modal open={show}>
        <PasswordContainer>
          <PasswordContent>
            <PasswordInput>
              <Typography variant="subtitle1" fontWeight={300}>
                비밀번호를 설정할 수 있어요.
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={300}
                style={{ paddingTop: 10, paddingBottom: 10 }}
              >
                모임을 수정하거나 확정할 때 사용해요
              </Typography>
              <MaskingInputContainer>
                <MaskingInput
                  length={4}
                  text={password ?? ''}
                  setText={onChange}
                  size={28}
                  style={{ paddingTop: 10 }}
                />
              </MaskingInputContainer>
            </PasswordInput>
            <div style={{ height: 50 }}>
              <FullHeightButtonGroup
                fullWidth
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
              >
                <Button color="secondary" onClick={onCancel}>
                  취소하기
                </Button>
                <Button onClick={handleSubmit} disabled={!isPasswordValid}>
                  설정하기
                </Button>
              </FullHeightButtonGroup>
            </div>
            <PasswordSkipBtn
              color="primary"
              variant="text"
              size="small"
              onClick={handleSkip}
              style={{ borderRight: 0 }}
            >
              생략하기
            </PasswordSkipBtn>
          </PasswordContent>
        </PasswordContainer>
      </Modal>
    </>
  );
}
