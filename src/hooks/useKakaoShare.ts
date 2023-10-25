import { useEffect, useState } from 'react';

export const useKakaoShare = ({
  title,
  description,
  meetingId,
}: {
  title: string;
  description: string;
  meetingId: string;
}) => {
  const [isInitialized, setInitialized] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const REDIRECT_URL = `${window.location.origin}/meetings/${meetingId}`;
  const API_KEY = import.meta.env.VITE_KAKAOTALK_JS_SDK_KEY;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      try {
        window.Kakao.init(API_KEY);
        setInitialized(true);
      } catch {
        setError(true);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isInitialized && ref) {
      try {
        window.Kakao.Share.createDefaultButton({
          container: ref,
          objectType: 'feed',
          content: {
            title,
            description,
            link: {
              mobileWebUrl: REDIRECT_URL,
              webUrl: REDIRECT_URL,
            },
            imageUrl: '',
          },
        });
      } catch {
        setError(true);
        setLoading(false);
      }
    }
  }, [REDIRECT_URL, description, isInitialized, ref, title]);

  return {
    isError,
    isLoading: !isError && !isInitialized && !isLoading,
    serviceName: '카카오톡',
    ref,
    setRef,
  };
};
