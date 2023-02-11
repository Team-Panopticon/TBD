import { useCallback } from 'react';

export interface IMeetingEditStep {
  index: number;
  description: string;
  progress: number;
  title?: string;
  component?: React.ReactNode;
  type: 'name' | 'date' | 'type' | 'deadline' | 'confirm';
}

export default function useMeetingEdit() {
  const getMeetingEditSteps = useCallback((type: 'create' | 'modify'): IMeetingEditStep[] => {
    return [
      {
        index: 0,
        description: '모임의 이름이 무엇인가요?',
        progress: 25,
        title: '모임 이름',
        type: 'name',
      },
      {
        index: 1,
        description: '언제 만나려고 하시나요?',
        progress: 50,
        title: '모임 날짜',
        type: 'date',
      },
      {
        index: 2,
        description: '약속의 유형을 선택해 주세요',
        progress: 75,
        title: '모임 유형',
        type: 'type',
      },
      {
        index: 3,
        description: '언제까지 투표하시나요?',
        progress: 100,
        title: '투표 마감',
        type: 'deadline',
      },

      {
        index: 4,
        description: '모임을 만들 준비가 되었나요?',
        progress: 100,
        type: 'confirm',
      },
    ];
  }, []);
  return { getMeetingEditSteps };
}
