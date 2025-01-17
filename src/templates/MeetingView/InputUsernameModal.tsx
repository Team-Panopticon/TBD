import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import { CenterContentModal } from '../../components/CenterContentModal';
import { FullHeightButtonGroup } from '../../components/styled';

enum InvalidText {
  EMPTY = '이름은 한글자 이상 입력해야 합니다',
  DUP = '중복된 이름입니다',
}

interface Props {
  show: boolean;
  usernameList: string[];
  onConfirm: (username: string) => void;
  onCancel: () => void;
}

export function InputUsernameModal({ show, usernameList, onConfirm, onCancel }: Props) {
  const [username, setUsername] = useState('');
  const [invalidText, setInvalidText] = useState<InvalidText | ''>('');

  const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 20);
    setUsername(value);

    if (value.trim().length === 0) {
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
          <Box padding={3} pb={1}>
            <InputLabel shrink>참석자 이름 (최대 20자)</InputLabel>
            <TextField
              autoComplete="off"
              id="userId"
              size="small"
              variant="outlined"
              fullWidth
              value={username}
              placeholder="당신의 이름을 정해주세요"
              onChange={onChangeTextField}
              error={invalidText !== ''}
              helperText={invalidText}
              inputProps={{ maxLength: 20 }}
            />
          </Box>
          <FullHeightButtonGroup
            fullWidth
            variant="contained"
            style={{ height: 52, position: 'absolute', bottom: 0, padding: '8px 12px' }}
          >
            <Button color="secondary" onClick={onCancel}>
              다음에
            </Button>
            <Button
              onClick={() => {
                onConfirm(username.trim());
              }}
              disabled={username.trim().length === 0 || invalidText !== ''}
            >
              완료
            </Button>
          </FullHeightButtonGroup>
        </div>
      </CenterContentModal>
    </>
  );
}
