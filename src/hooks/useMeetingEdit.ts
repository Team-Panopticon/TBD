export interface IMeetingEditStep {
  description: string;
  progress: number;
}

export default function useMeetingEdit() {
  const getMeetingEditSteps = (type: 'create' | 'modify'): IMeetingEditStep[] => {
    return [
      {
        description: '모임의 이름이 무엇인가요?',
        progress: 25,
      },
      {
        description: '언제 만나려고 하시나요?',
        progress: 50,
      },
      {
        description: '약속의 유형을 선택해 주세요',
        progress: 75,
      },
      {
        description: '언제까지 투표하시나요?',
        progress: 100,
      },

      {
        description: '모임을 만들 준비가 되었나요?',
        progress: 100,
      },
    ];
  };
  return { getMeetingEditSteps };
}
