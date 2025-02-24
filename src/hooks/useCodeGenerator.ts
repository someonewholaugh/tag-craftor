import axios from 'axios';
import { useState, useRef, useCallback } from 'react';
import { encryptValue } from '@/utils';
import type { UseCodeGeneratorReturn } from '@/types';

export const useCodeGenerator = (encrypt?: boolean): UseCodeGeneratorReturn => {
  const [codeValue, setCodeValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const codeRef = useRef<HTMLDivElement | null>(null);
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY as string;

  const shortenUrl = useCallback(
    async (url: string): Promise<string> => {
      try {
        const response = await axios.post<{ short_url: string }>(
          'https://spoo.me/',
          new URLSearchParams({ url }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
            },
          }
        );

        const shortUrl = response.data.short_url;
        return encrypt ? encryptValue(shortUrl) : shortUrl;
      } catch (error: any) {
        console.error('Error shortening URL:', error.response?.data || error.message);
        return url;
      }
    },
    [encrypt]
  );

  const generateCode = useCallback(
    async (value: string | File, onComplete?: (finalValue: string) => void): Promise<void> => {
      setLoading(true);
      setShowCode(true);

      if (value instanceof File) {
        const formData = new FormData();
        formData.append('image', value);

        try {
          const response = await axios.post<{ data: { url: string } }>(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            formData
          );
          const imageUrl = response.data.data.url;
          const shortUrl = await shortenUrl(imageUrl);
          setCodeValue(shortUrl);
          onComplete?.(shortUrl);
        } catch (error) {
          console.error('Failed to upload image', error);
          setCodeValue('');
        } finally {
          setLoading(false);
        }
        return;
      }

      setTimeout(() => {
        setLoading(false);
        const processedValue = encrypt ? encryptValue(value) : value;
        setCodeValue(processedValue);
        onComplete?.(processedValue);
      }, 1000);
    },
    [apiKey, encrypt, shortenUrl]
  );

  const downloadCode = useCallback(() => {
    if (!codeRef.current) return;

    const qrSvg = codeRef.current.querySelector('svg');
    const barcodeCanvas = codeRef.current.querySelector('canvas');

    const downloadImage = (url: string, filename: string) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    };

    const generateFilename = (): string => `${Math.random().toString(36).substring(2, 15)}.png`;

    if (qrSvg) {
      const svgData = new XMLSerializer().serializeToString(qrSvg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = qrSvg.clientWidth;
        canvas.height = qrSvg.clientHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const pngUrl = canvas.toDataURL('image/png');
          downloadImage(pngUrl, generateFilename());
        }

        URL.revokeObjectURL(url);
      };
      img.src = url;
    } else if (barcodeCanvas) {
      const url = barcodeCanvas.toDataURL('image/png');
      downloadImage(url, generateFilename());
    } else {
      console.error('QR code or barcode element not found');
    }
  }, [codeRef]);

  return {
    codeValue,
    loading,
    showCode,
    generateCode,
    downloadCode,
    codeRef,
  };
};
