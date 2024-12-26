'use client';

import { useImmer } from 'use-immer';
import { Button } from '../ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';
import { useDebouncedCallback, useThrottledCallback } from '@mantine/hooks';

export default function EasyScroller() {
  const refHandler = useRef<HTMLDivElement>(null);
  const refStore = useRef<{
    prevScrollTop: number;
  }>({
    prevScrollTop: 0,
  });
  const [state, setState] = useImmer({
    actived: false,
    isScrollUp: false,
  });
  const active = useThrottledCallback(() => {
    setState((draft) => {
      draft.actived = true;
    });
  }, 500);
  const deactive = useDebouncedCallback(() => {
    setState((draft) => {
      draft.actived = false;
    });
  }, 2000);
  useEffect(() => {
    if (refHandler.current) {
      const dom = refHandler.current.parentElement!;
      const handler = (e: Event) => {
        const target = e.target as HTMLElement;
        const currentScrollTop = target.scrollTop;
        const prevScrollTop = refStore.current.prevScrollTop;
        refStore.current.prevScrollTop = currentScrollTop;
        if (currentScrollTop !== prevScrollTop) {
          active();
          deactive();
          setState((draft) => {
            draft.isScrollUp = currentScrollTop < prevScrollTop;
          });
        }
      };
      dom.addEventListener('scroll', handler);
      return () => {
        dom.removeEventListener('scroll', handler);
      };
    }
  }, [active, deactive, setState]);
  return (
    <div
      ref={refHandler}
      className={cn('fixed bottom-[50%] right-4 opacity-0 transition-opacity', {
        'pointer-events-none': !state.actived,
        'opacity-100': state.actived,
      })}
    >
      <Button
        variant="outline"
        size="icon"
        className=""
        onClick={() => {
          const dom = refHandler.current!.parentElement!;
          if (state.isScrollUp) {
            dom.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          } else {
            dom.scrollTo({
              top: dom.scrollHeight,
              behavior: 'smooth',
            });
          }
        }}
      >
        <ArrowUp
          className={cn('transition-transform', {
            'rotate-180': !state.isScrollUp,
          })}
        />
      </Button>
    </div>
  );
}
