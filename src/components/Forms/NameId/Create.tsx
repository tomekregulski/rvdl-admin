import { ChangeEvent, Dispatch } from 'react';

export interface CreateNameIdProps {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}

export function Create(props: CreateNameIdProps) {
  const { value, setValue } = props;

  return (
    <input
      className="bg-white border p-2"
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
    />
  );
}
