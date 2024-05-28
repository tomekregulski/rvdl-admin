import * as RadixDialog from '@radix-ui/react-dialog';
import { ReactNode, useState } from 'react';

export interface DialogProps {
  trigger: ReactNode;
  title: ReactNode;
  body: ReactNode;
  subtitle: ReactNode;
  onSubmit: () => void;
}

export function Dialog(props: DialogProps) {
  const { trigger, body, title, subtitle, onSubmit } = props;

  const [open, setOpen] = useState(false);

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay />
        <RadixDialog.Content>
          <RadixDialog.Title>{title}</RadixDialog.Title>
          <RadixDialog.Description>
            {subtitle}
            {body}
            <button
              type="submit"
              onClick={async () => {
                try {
                  await onSubmit();
                  setOpen(false);
                } catch {
                  console.log('error deleting');
                }
              }}
            >
              Submit
            </button>
          </RadixDialog.Description>
          <RadixDialog.Close />
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
