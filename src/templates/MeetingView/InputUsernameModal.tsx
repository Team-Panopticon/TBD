import { Button, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';

import { CenterContentModal } from '../../components/CenterContentModal';
import { FullHeightButtonGroup } from '../../components/styled';

enum InvalidText {
  EMPTY = '참석자 이름을 입력해주세요',
  DUP = '중복된 이름입니다',
}

interface Props {
  show: boolean;
  usernameList: string[];
  onConfirm: (username: string) => Promise<void>;
  onCancel: () => void;
}

export function InputUsernameModal({ show, usernameList, onConfirm, onCancel }: Props) {
  const [username, setUsername] = useState('');
  const [invalidText, setInvalidText] = useState<InvalidText | ''>('');

  const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length === 0) {
      setInvalidText(InvalidText.EMPTY);
    } else if (!validation(value)) {
      setInvalidText(InvalidText.DUP);
    } else {
      setInvalidText('');
    }
  };

  /** username이 usernameList에 있지 않아 valid한 경우 true */
  const validation = (username: string): boolean => !usernameList.includes(username);

  return (
    <>
      <CenterContentModal open={show} width={320} height={170}>
        <div style={{ position: 'relative', height: '100%' }}>
          <div style={{ padding: 25 }}>
            <InputLabel shrink>참석자 이름</InputLabel>
            <TextField
              id="userId"
              size="small"
              variant="outlined"
              fullWidth
              value={username}
              onChange={onChangeTextField}
              error={invalidText !== ''}
              helperText={invalidText}
            />
          </div>
          <FullHeightButtonGroup
            fullWidth
            variant="contained"
            style={{ height: 45, position: 'absolute', bottom: 0 }}
          >
            <Button color="secondary" onClick={onCancel}>
              다음에
            </Button>
            <Button
              onClick={() => {
                onConfirm(username);
              }}
              disabled={username.length === 0 || invalidText !== ''}
            >
              완료
            </Button>
          </FullHeightButtonGroup>
        </div>
      </CenterContentModal>
    </>
  );
}
