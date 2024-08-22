import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps extends RadixSelect.SelectProps {
  options: Option[];
  placeholder: string;
}

export function Select(props: SelectProps) {
  const { defaultValue, placeholder, options, onValueChange } = props;

  return (
    <RadixSelect.Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <RadixSelect.Trigger className="flex items-center justify-between text-black w-[200px] bg-slate-200">
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content position="popper" className="w-[200px]">
          <RadixSelect.Viewport className="bg-slate-200">
            {options.map((option) => (
              <RadixSelect.Item
                className="flex items-center justify-start gap-[4px] h-[32px] hover:bg-gray-500 hover:cursor-pointer p-4 text-black"
                key={option.value}
                value={option.value}
              >
                <RadixSelect.ItemText className="text-black">
                  {option.label}
                </RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                  <CheckIcon />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
