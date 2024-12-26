import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { X as RemoveIcon } from 'lucide-react';
import { unique } from 'radash';
import { useMemo, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export default function TagInputAutocomplete({
  value,
  onChange,
  autocompleteOptions = [],
  style,
  className,
  ...inputProps
}: {
  value: string[];
  onChange: (value: string[]) => void;
  autocompleteOptions?: string[];
} & React.ComponentPropsWithoutRef<'input'>) {
  // const refInput = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const value1 = useMemo(() => unique(value), [value]);
  const options1 = useMemo(
    () => unique(autocompleteOptions),
    [autocompleteOptions]
  );
  const options2 = useMemo(() => {
    return options1.filter(
      (o) => o.includes(inputValue) && !value1.includes(o)
    );
  }, [options1, value1, inputValue]);
  const badges = (
    <div className="flex flex-wrap gap-2 p-2 pb-0">
      {value1.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="p-2 flex items-center cursor-default"
        >
          {tag}
          <button
            type="button"
            onClick={() => {
              onChange(value1.filter((v) => v !== tag));
            }}
            className="disabled:cursor-not-allowed"
          >
            <RemoveIcon className="ml-1 h-4 w-4 stroke-muted-foreground hover:stroke-destructive" />
          </button>
        </Badge>
      ))}
    </div>
  );
  return (
    <div
      style={style}
      className={cn('flex flex-col gap-0 border rounded-md', className)}
    >
      {badges}
      <Command>
        <CommandInput
          {...inputProps}
          value={inputValue}
          onValueChange={setInputValue}
          placeholder="Search..."
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              if (inputValue) {
                onChange([...value1, inputValue]);
                setInputValue('');
              }
            }
          }}
        />
        <CommandList className="max-h-[150px] overflow-auto">
          <CommandEmpty>No recommendations.</CommandEmpty>
          {options2.map((option) => (
            <CommandItem
              key={option}
              onSelect={() => {
                onChange([...value1, option]);
              }}
            >
              {option}
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}
