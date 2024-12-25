'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export default function ThemeModeToggle() {
  const { setTheme } = useTheme();

  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col gap-0 w-[100px] items-stretch p-1">
        <Button
          variant="ghost"
          size="sm"
          className="justify-start"
          onClick={() => setTheme('light')}
        >
          Light
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start"
          onClick={() => setTheme('dark')}
        >
          Dark
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="justify-start"
          onClick={() => setTheme('system')}
        >
          System
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
