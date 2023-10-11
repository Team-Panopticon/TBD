import { RefObject, useEffect, useRef } from 'react';

const restartAnimation = <T extends HTMLElement>(el: T) => {
  el.style.opacity = '0';
  1;
  el.style.animationName = 'none';

  requestAnimationFrame(() => {
    setTimeout(() => {
      el.style.animationName = '';
    }, 0);
  });
};

export const useRestartAnimation = <T, E extends HTMLElement>(state: T) => {
  const targetRef = useRef<E>() as RefObject<E>;

  useEffect(() => {
    if (targetRef.current) {
      restartAnimation(targetRef.current);
    }
  }, [state]);

  return {
    targetRef,
  };
};
