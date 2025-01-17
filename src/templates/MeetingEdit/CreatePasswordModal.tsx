import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CenterContentModal } from '../../components/CenterContentModal';
import { MaskingInput } from '../../components/MaskingInput';
import { FullHeightButtonGroup } from '../../components/styled';
import { validatePassword } from '../../stores/createMeeting';
import { MaskingInputContainer, PasswordInput, PasswordSkipBtn } from './styled';

interface Props {
  show: boolean;
  password?: string;
  onChange: (newPassword: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onSkip?: () => void;
}

/**
 * 비밀번호 생성 모달창
 * - 비밀번호 유효성 검증과 표시
 * - 버튼 클릭에 따라서 비밀번호를 인자로 onConfirm handler 호출
 */
export function CreatePasswordModal({
  show,
  password,
  onChange,
  onConfirm,
  onCancel,
  onSkip,
}: Props) {
  const isPasswordValid = password !== undefined && validatePassword(password);

  return (
    <CenterContentModal open={show} width={320} height={208}>
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
          <MaskingInput length={4} text={password ?? ''} setText={onChange} size={28} />
        </MaskingInputContainer>
      </PasswordInput>
      <div style={{ height: 64, padding: '12px 24px' }}>
        <FullHeightButtonGroup
          fullWidth
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button color="secondary" onClick={onCancel}>
            취소
          </Button>
          <Button onClick={onConfirm} disabled={!isPasswordValid}>
            설정
          </Button>
        </FullHeightButtonGroup>
      </div>
      <PasswordSkipBtn
        color="primary"
        variant="text"
        size="small"
        onClick={onSkip}
        style={{ borderRight: 0 }}
      >
        생략하기
      </PasswordSkipBtn>
    </CenterContentModal>
  );
}
