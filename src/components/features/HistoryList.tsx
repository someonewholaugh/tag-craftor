import { useState, useEffect } from 'react';
import { Button } from '@headlessui/react';
import { Icon, Modal, Barcode, QrCode } from '@/components';
import { getHistory, removeFromHistory } from '@/utils';
import type { HistoryItem } from '@/types';

export const HistoryList = () => {
  const [history, setHistory] = useState<HistoryItem[]>(getHistory());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    const handleStorageChange = () => setHistory(getHistory());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const openModal = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  if (history.length === 0) {
    return <p className="text-xs text-center text-zinc-500">No history available</p>;
  }

  const renderCodeComponent = () => {
    if (!selectedItem) return null;
    return selectedItem.codeType === 'Barcode' ? (
      <div className="max-w-lg mx-auto bg-white rounded-md overflow-x-a w-fit">
        <Barcode value={selectedItem.value} />
      </div>
    ) : (
      <div className="p-2 mx-auto bg-white rounded-md w-fit">
        <QrCode value={selectedItem.value} />
      </div>
    );
  };

  return (
    <>
      <div className="space-y-2">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-2 space-x-2 transition-colors duration-200 border rounded-lg cursor-pointer border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={() => openModal(item)}
          >
            <Icon name={(item.codeType as 'Barcode') || 'QrCode'} />
            <div className="space-y-0.5">
              <p className="text-xs truncate max-w-52">{item.decryptedValue || item.value}</p>
              <p className="text-[0.6rem] text-zinc-500">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={handleCloseModal} title={selectedItem?.codeType || 'Details'}>
        {selectedItem && (
          <div className="flex flex-col items-center py-8 space-y-4">
            {renderCodeComponent()}
            <div className="space-y-1 text-center">
              {selectedItem.decryptedValue?.startsWith('https://') ? (
                <a
                  href={selectedItem.decryptedValue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="max-w-xs mx-auto text-sm text-blue-600 line-clamp-2 dark:text-blue-400 hover:underline"
                >
                  {selectedItem.decryptedValue}
                </a>
              ) : (
                <h1 className="max-w-xs mx-auto text-sm line-clamp-2">
                  {selectedItem.decryptedValue || selectedItem.value}
                </h1>
              )}
              <p className="text-[0.7rem] text-zinc-500">
                {new Date(selectedItem.timestamp).toLocaleString()}
              </p>
            </div>
            <Button
              className="px-3 py-1.5 text-red-500 bg-transparent border border-red-500 rounded-md w-fit text-xs cursor-pointer hover:text-white hover:bg-red-500 ease-in-out duration-300"
              onClick={() => {
                removeFromHistory(selectedItem.id);
                setIsOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};
