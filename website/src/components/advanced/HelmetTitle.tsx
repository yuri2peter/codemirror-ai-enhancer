import { useChangeTitle } from '@/hooks/use-change-title';

export default function HelmetTitle({ title }: { title: string }) {
  useChangeTitle(title);
  return null;
}
