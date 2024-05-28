import { ChangeEvent, Dispatch } from 'react';

export interface CreateNameIdProps {
  value: string;
  placeholder: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}

export function Update(props: CreateNameIdProps) {
  const { value, setValue, placeholder } = props;

  return (
    <input
      className="bg-white border p-2"
      value={value}
      placeholder={placeholder}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
    />
  );
}
