import { RefObject, useEffect, useState } from 'react';

export const useKakaoShare = ({
  ref,
  url,
  title,
  description,
}: {
  ref: RefObject<HTMLElement>;
  url: string;
  title: string;
  description: string;
}) => {
  const [isInitialized, setInitialized] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      try {
        window.Kakao.init('1bef82833af6e7bc26767e5391f5014b');
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
              mobileWebUrl: url,
              webUrl: url,
            },
            imageUrl: '',
          },
        });
      } catch {
        setError(true);
        setLoading(false);
      }
    }
  }, [description, isInitialized, ref, title, url]);

  return { isError, isLoading: !isError && !isInitialized && !isLoading, serviceName: '카카오톡' };
};
