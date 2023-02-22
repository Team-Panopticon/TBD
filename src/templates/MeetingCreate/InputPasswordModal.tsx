import { Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';

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
}

export function InputPasswordModal({ showMaskingInput }: Props) {
  const [passwordText, setPasswordText] = useState('');

  const onEndCreate = () => {
    /**
     * @TODO
     * API 요청, 응답 시 리다이렉팅
     */
  };
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
                모임을 수정하거나 확정할 떄 사용해요
              </Typography>
              <MaskingInputContainer>
                <MaskingInput
                  length={4}
                  text={passwordText}
                  setText={setPasswordText}
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
                <Button onClick={onEndCreate}>생략하기</Button>
                <Button onClick={onEndCreate}>설정하기</Button>
              </FullHeightButtonGroup>
            </div>
          </PasswordContent>
        </PasswordContainer>
      </Modal>
    </>
  );
}
