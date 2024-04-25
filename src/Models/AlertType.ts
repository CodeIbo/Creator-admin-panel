import { ReactNode } from 'react';

export type SeverityTypes = 'error' | 'info' | 'success' | 'warning';

export interface AlertContextType {
  alert: { message: string; type: SeverityTypes };
  triggerAlert: (message: string, type?: SeverityTypes) => void;
}

export interface AlertProviderProps {
  children: ReactNode;
}
