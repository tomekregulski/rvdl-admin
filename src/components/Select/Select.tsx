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
  const { placeholder, options, onValueChange } = props;

  return (
    <RadixSelect.Root onValueChange={onValueChange}>
      <RadixSelect.Trigger className="flex items-center justify-between w-[200px]">
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content position="popper" className="w-[200px]">
          <RadixSelect.Viewport className="bg-black">
            {options.map((option) => (
              <RadixSelect.Item
                className="flex items-center justify-start gap-[4px] h-[32px] hover:bg-gray-500 hover:cursor-pointer p-4 text-white"
                key={option.value}
                value={option.value}
              >
                <RadixSelect.ItemText className="text-white">
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
