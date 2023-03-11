import { Button, Modal, Typography } from '@mui/material';

import { MaskingInput } from '../../components/MaskingInput';
import {
  FullHeightButtonGroup,
  MaskingInputContainer,
  PasswordContainer,
  PasswordContent,
  PasswordInput,
} from './styled';

interface Props {
  showMaskingInput: boolean;
  password: string;
  onChange: (newPassword: string) => void;
  onConfirm: (setPassword: boolean) => Promise<void>;
}

export function InputPasswordModal({ showMaskingInput, password, onChange, onConfirm }: Props) {
  const onEndCreate = (setPassword: boolean) => {
    onConfirm(setPassword);
  };
  const disableConfirmBtn = password.length !== 4;

  return (
    <>
      <Modal open={showMaskingInput}>
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
                  text={password}
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
                {/* ButtonGroup 컴포넌트의 borderRight 기본 스타일을 diable 하기 위하여 스타일 추가 */}
                <Button
                  color="transPrimary"
                  onClick={() => onEndCreate(false)}
                  style={{ borderRight: 0 }}
                >
                  생략하기
                </Button>
                <Button disabled={disableConfirmBtn} onClick={() => onEndCreate(true)}>
                  설정하기
                </Button>
              </FullHeightButtonGroup>
            </div>
          </PasswordContent>
        </PasswordContainer>
      </Modal>
    </>
  );
}
