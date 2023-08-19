/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_KAKAOTALK_JS_SDK_KEY: string;
  readonly VITE_ORIGIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

type CreateDefaultButtonFeedParams = {
  container: HTMLElement | string;
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    /** [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함 */
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons?: {
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }[];
};

interface Window {
  Kakao: {
    init: (APIKey: string) => void;
    isInitialized: () => boolean;
    Share: {
      createDefaultButton: (params: CreateDefaultButtonFeedParams) => void;
    };
  };
}
