import { createContext, useContext } from 'react';
import type { AppContextProps } from '../utils/interfaces';

export const AppContext = createContext<AppContextProps | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useAppContext must be used within AppProvider');
  return context;
};
