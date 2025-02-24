import { Button } from '@headlessui/react';
import { Barcode, QrCode, Icon } from '@/components';
import type { CodeOutputProps } from '@/types';
import { cn } from '@/utils';

export const CodeOutput = ({
  codeValue,
  codeType,
  onDownload,
  isLoading,
  codeRef,
}: CodeOutputProps) => {
  const renderCode = () => {
    if (!codeValue) {
      return <p className="text-xs text-center text-red-400">Error generating {codeType}</p>;
    }

    const isBarcode = codeType === 'Barcode';

    return (
      <div ref={codeRef} className={cn('p-2 mx-auto w-fit', !isBarcode && 'bg-white rounded-md')}>
        {isBarcode ? <Barcode value={codeValue} /> : <QrCode value={codeValue} />}
      </div>
    );
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center">
          <Icon name="LoaderCircle" className="animate-spin" noHover />
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full overflow-x-auto">{renderCode()}</div>
          {codeValue && (
            <Button
              className="px-3 py-1.5 text-sm font-medium text-black duration-300 ease-in-out border rounded-md cursor-pointer border-zinc-300 w-fit dark:border-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              onClick={onDownload}
            >
              Download
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
