import { useState, useEffect } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { decryptValue } from '@/utils';

const Scanner = () => {
  const [decodedText, setDecodedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleScanSuccess = (decoded) => {
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
    const scanner = new Html5QrcodeScanner('reader', scannerConfig);

    scanner.render(handleScanSuccess, (error) => console.warn('Scan error:', error));

    return () => {
      scanner.clear().catch((err) => console.error('Error clearing scanner:', err));
    };
  }, []);

  const isLink = decryptedText.startsWith('https://');

  return (
    <div className="space-y-4">
      <Card radius="sm">
        <CardBody className={!decodedText || !decryptedText ? 'hidden' : 'block'}>
          <div className="flex flex-col items-center space-y-4">
            {decodedText !== decryptedText && (
              <div className="flex flex-col items-center w-full space-y-2.5 p-4 bg-foreground-50 rounded-md overflow-clip">
                <span className="text-sm text-gray-500">Decoded:</span>
                <code className="text-xs text-center max-w-[18rem] sm:max-w-lg lg:max-w-xl text-wrap">
                  {decodedText}
                </code>
              </div>
            )}
            {decryptedText && (
              <div className="flex flex-col items-center w-full space-y-2.5 p-4 bg-foreground-50 rounded-md">
                <span className="text-sm text-gray-500">Decrypted:</span>
                {isLink ? (
                  <Link href={decryptedText} size='sm' target="_blank" rel="noopener noreferrer">
                    {decryptedText}
                  </Link>
                ) : (
                  <span className="text-xs text-center max-w-[18rem] sm:max-w-lg lg:max-w-xl text-wrap">
                    {decryptedText}
                  </span>
                )}
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {!decryptedText && <div id="reader"></div>}
    </div>
  );
};

export default Scanner;
