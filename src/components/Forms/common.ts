import { ReactNode } from 'react';

export interface ResponseType {
  type: 'error' | 'success';
  message: string | ReactNode;
}
