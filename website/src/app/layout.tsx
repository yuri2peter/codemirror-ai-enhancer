import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import { enableMapSet } from 'immer';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
// import 'dayjs/locale/zh-cn';
import './globals.css';
import { RootLayerRenderer } from '@/components/ui/rootLayer';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

enableMapSet();
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(isLeapYear);
// dayjs.locale('zh-cn');

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  icons: {
    icon: '/images/logo.png',
  },
  description:
    'A CodeMirror extension that leverages AI to perform localized text modifications and continuations.',
  keywords: ['CodeMirror', 'AI', 'text modification', 'continuation'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        <ThemeProvider attribute="class" forcedTheme="dark">
          <TooltipProvider>
            <Toaster position="top-center" />
            <RootLayerRenderer />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
