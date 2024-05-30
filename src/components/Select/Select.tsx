import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';
import { ReactNode } from 'react';
import { DataTypes } from 'types/Models';

export interface Option {
  value: string;
  label: ReactNode;
}

export interface SelectProps extends RadixSelect.SelectProps {
  options: Option[];
  dataType: DataTypes;
}

// const SelectItem = forwardRef((props: , forwardedRef) => {
//   const { children, className, ...restProps } = props;
//   return (
//     <Select.Item
//       className={classnames(
//         'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
//         className,
//       )}
//       {...props}
//       ref={forwardedRef}
//     >
//       <Select.ItemText>{children}</Select.ItemText>
//       <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
//         <CheckIcon />
//       </Select.ItemIndicator>
//     </Select.Item>
//   );
// });

export function Select(props: SelectProps) {
  const { dataType, options, onValueChange } = props;

  return (
    <RadixSelect.Root onValueChange={onValueChange}>
      <RadixSelect.Trigger className="flex items-center justify-between w-[200px]">
        <RadixSelect.Value placeholder={`Select a ${dataType}`} />
        <RadixSelect.Icon>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content position="popper" className="w-[200px]">
          <RadixSelect.Viewport className="bg-black">
            {options.map((option) => (
              <RadixSelect.Item
                className="flex items-center justify-start gap-[4px] h-[32px] hover:bg-gray-500 hover:cursor-pointer p-4"
                key={option.value}
                value={option.value}
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
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
