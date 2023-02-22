import { Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';

import { MaskingInput } from '../../components/MaskingInput';
import { FullHeightButtonGroup, PasswordInput, PasswordInputContainer } from './styled';

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
        <PasswordInputContainer>
          <PasswordInput>
            <Typography variant="h6" fontWeight={300}>
              비밀번호를 설정할 수 있어요.
            </Typography>
            <Typography variant="subtitle1" fontWeight={300}>
              모임을 수정하거나 확정할 떄 사용해요
            </Typography>
            <MaskingInput length={4} text={passwordText} setText={setPasswordText} />
            <div style={{ height: 46 }}>
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
          </PasswordInput>
        </PasswordInputContainer>
      </Modal>
    </>
  );
}
