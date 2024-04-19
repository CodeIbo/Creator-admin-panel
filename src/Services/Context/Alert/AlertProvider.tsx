import { createContext, useContext, useMemo, useState } from 'react';
import {
  AlertContextType,
  AlertProviderProps,
  SeverityTypes,
} from '../../../Models/AlertType';

const defaultState: AlertContextType = {
  alert: { message: '', type: 'info' },
  triggerAlert: () => {},
};

const AlertContext = createContext(defaultState);

export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<{ message: string; type: SeverityTypes }>(
    defaultState.alert
  );

  const triggerAlert = (message: string, type: SeverityTypes = 'info') => {
    setAlert({ message, type });
    setTimeout(
      () =>
        setAlert((prevState) => {
          return { message: '', type: prevState.type };
        }),
      3000
    );
  };

  const value = useMemo(() => ({ alert, triggerAlert }), [alert]);

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}
