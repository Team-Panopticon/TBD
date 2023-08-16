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

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('1bef82833af6e7bc26767e5391f5014b');
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized && ref.current) {
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
    }
  }, [description, isInitialized, ref, title, url]);
};
