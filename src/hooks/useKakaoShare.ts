import { useEffect, useRef, useState } from 'react';

export const useKakaoShare = ({ title, description }: { title: string; description: string }) => {
  const [isInitialized, setInitialized] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const ref = useRef<HTMLAnchorElement>(null);
  const URL = import.meta.env.VITE_ORIGIN_URL as string;
  const API_KEY = import.meta.env.VITE_KAKAOTALK_JS_SDK_KEY as string;

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
    if (isInitialized && ref.current) {
      try {
        window.Kakao.Share.createDefaultButton({
          container: ref.current,
          objectType: 'feed',
          content: {
            title,
            description,
            link: {
              mobileWebUrl: URL,
              webUrl: URL,
            },
            imageUrl: '',
          },
        });
      } catch {
        setError(true);
        setLoading(false);
      }
    }
  }, [URL, description, isInitialized, ref, title]);

  return {
    isError,
    isLoading: !isError && !isInitialized && !isLoading,
    serviceName: '카카오톡',
    ref,
  };
};
