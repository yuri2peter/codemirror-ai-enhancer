import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { unique } from 'radash';
import { useMemo, useRef } from 'react';

export default function Autocomplete({
  value,
  onChange,
  autocompleteOptions,
  style,
  className,
  onSelect,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  autocompleteOptions: string[];
  onSelect?: (value: string) => void;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'>) {
  const refInput = useRef<HTMLInputElement>(null);
  const options1 = useMemo(
    () => unique(autocompleteOptions),
    [autocompleteOptions]
  );
  const options2 = useMemo(() => {
    return options1.filter((o) => o.includes(value));
  }, [value, options1]);
  return (
    <div style={style} className={cn('flex flex-col gap-2', className)}>
      <Input
        {...props}
        className="rounded-none border-none"
        ref={refInput}
        value={value}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
      />

      {autocompleteOptions.length > 0 &&
        (options2.length > 0 ? (
          <div className="p-1 flex flex-col gap-1 h-48 overflow-y-auto">
            {options2.map((option) => (
              <Button
                key={option}
                className="block w-full text-left cursor-pointer"
                variant="ghost"
                onClick={() => {
                  onChange(option);
                  refInput.current?.focus();
                  onSelect?.(option);
                }}
              >
                {option}
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center border border-border rounded-md h-48 overflow-y-auto">
            <span className="text-sm text-muted-foreground">
              No options found
            </span>
          </div>
        ))}
    </div>
  );
}
