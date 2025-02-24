import { useState, useEffect } from 'react';
import { Button } from '@headlessui/react';
import { Layout, Header, HistoryList, Icon, ThemeSwitcher, UserInput, Modal } from '@/components';
import { clearHistory, getHistory } from '@/utils';
import type { HistoryItem } from '@/types';
import { Scanner } from './components/features/Scanner';

const App = () => {
  const [history, setHistory] = useState<HistoryItem[]>(getHistory());
  const [type, setType] = useState<string>('QrCode');
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleStorageChange = () => setHistory(getHistory());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    setHistory(getHistory());
  }, [isDeleteOpen, isHistoryOpen]);

  return (
    <Layout className="flex md:space-x-5">
      <main
        className="w-full lg:w-[75vw] space-y-5 bg-white p-4 md:p-5 border rounded-xl min-h-svh sm:min-h-[calc(100vh-2rem)] border-zinc-300 dark:bg-black dark:border-zinc-700"
        aria-label="Main Content"
      >
        <Header type={type} setType={setType}>
          <div className="flex items-center space-x-3">
            <Button className="lg:hidden" onClick={() => setIsHistoryOpen(true)}>
              <Icon title="History" name="History" />
            </Button>
            <Icon
              title="Scanner"
              name="Scan"
              className="cursor-pointer"
              onClick={() => setIsScannerOpen(true)}
            />
            <a
              href="https://github.com/someonewholaugh/tag-craftor"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <Icon name="Github" />
            </a>
            <ThemeSwitcher />
          </div>
        </Header>
        <UserInput codeType={type} />
      </main>

      <aside
        className="hidden lg:inline-block md:w-[25vw] space-y-5 bg-white p-5 border rounded-xl min-h-svh sm:min-h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] overflow-y-auto border-zinc-300 dark:bg-black dark:border-zinc-700"
        aria-label="History Section"
      >
        <Header title="History">
          <div className="flex items-center space-x-2">
            <Icon name="History" noHover />
            <Button
              className="cursor-pointer disabled:cursor-not-allowed"
              onClick={() => setIsDeleteOpen(true)}
              disabled={history.length === 0}
            >
              <Icon name="Trash" noHover={history.length === 0} />
            </Button>
          </div>
        </Header>
        <HistoryList />
      </aside>

      <Modal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} title="Scanner">
        <Scanner />
      </Modal>

      <Modal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} title="History">
        <HistoryList />
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <div className="flex flex-col items-center pb-10 space-y-4 text-center">
          <Icon name="CircleAlert" size={100} className="mx-auto text-red-500" noHover />
          <div className="space-y-1">
            <h2 className="text-base font-semibold">Delete All History?</h2>
            <p className="max-w-sm text-xs text-zinc-500 line-clamp-2 text-pretty">
              This action cannot be undone. All data will be permanently deleted.
            </p>
          </div>
          <div className="flex justify-center w-full max-w-sm space-x-3">
            <Button
              onClick={() => setIsDeleteOpen(false)}
              className="w-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out border rounded-md cursor-pointer bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              Cancel
            </Button>

            <Button
              className="w-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
              onClick={() => {
                clearHistory();
                setHistory([]);
                setIsDeleteOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default App;
