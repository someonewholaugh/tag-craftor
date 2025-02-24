import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { decryptValue } from '@/utils';

export const Scanner = () => {
  const [decodedText, setDecodedText] = useState<string>('');
  const [decryptedText, setDecryptedText] = useState<string>('');

  const handleScanSuccess = (decoded: string) => {
    try {
      const decrypted = decryptValue(decoded);
      setDecodedText(decoded);
      setDecryptedText(decrypted || decoded);
    } catch (error) {
      console.error('Failed to decrypt:', error);
    }
  };

  useEffect(() => {
    const scannerConfig = { fps: 10, qrbox: 300 };
    const scanner = new Html5QrcodeScanner('reader', scannerConfig, false);
    scanner.render(handleScanSuccess, (error: any) => console.warn('Scan error:', error));

    return () => {
      scanner.clear().catch((err: any) => console.error('Error clearing scanner:', err));
    };
  }, []);

  const isLink = decryptedText.startsWith('https://');

  return (
    <div className="space-y-4">
      <div className={!decodedText || !decryptedText ? 'hidden' : 'block'}>
        <div className="flex flex-col items-center space-y-4">
          {decodedText !== decryptedText && (
            <div className="flex flex-col items-center w-full space-y-2.5 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-clip">
              <span className="text-sm text-zinc-500">Decoded:</span>
              <code className="text-xs text-center max-w-[18rem] sm:max-w-lg lg:max-w-xl text-wrap">
                {decodedText}
              </code>
            </div>
          )}
          {decryptedText && (
            <div className="flex flex-col items-center w-full space-y-2.5 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-md">
              <span className="text-sm text-zinc-500">Decrypted:</span>
              {isLink ? (
                <a
                  href={decryptedText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-xs text-center max-w-[18rem] sm:max-w-lg lg:max-w-xl text-wrap"
                >
                  {decryptedText}
                </a>
              ) : (
                <span className="text-xs text-center max-w-[18rem] sm:max-w-lg lg:max-w-xl text-wrap">
                  {decryptedText}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {!decryptedText && <div id="reader"></div>}
    </div>
  );
};
