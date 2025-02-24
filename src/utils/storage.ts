import { decryptValue, encryptValue } from '@/utils';
import type { HistoryItem } from '@/types';

const STORAGE_KEY = 'history';

export const getHistory = (): HistoryItem[] => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};

export const saveToHistory = (value: string, codeType: string, isEncrypted: boolean) => {
  if (!value) return;

  const newItem: HistoryItem = {
    id: crypto.randomUUID(),
    value: isEncrypted ? encryptValue(value) : value,
    decryptedValue: decryptValue(value) ?? '',
    codeType,
    timestamp: Date.now(),
    isEncrypted,
  };

  const history = getHistory();
  const updatedHistory = [newItem, ...history];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

  window.dispatchEvent(new Event('storage'));
};

export const removeFromHistory = (id: string) => {
  const history = getHistory();
  const updatedHistory = history.filter((item) => item.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

  window.dispatchEvent(new Event('storage'));
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('storage'));
};
