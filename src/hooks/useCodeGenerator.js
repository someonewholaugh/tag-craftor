import { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { encryptValue } from '@/utils/';

export const useCodeGenerator = (encrypt) => {
  const [codeValue, setCodeValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const codeRef = useRef();
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const shortenUrl = useCallback(
    async (url) => {
      try {
        const response = await axios.post('https://spoo.me/', new URLSearchParams({ url }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        });
        
        const shortUrl = response.data.short_url;
        return encrypt ? encryptValue(shortUrl) : shortUrl;
      } catch (error) {
        console.error('Error shortening URL:', error.response?.data || error.message);
        return url;
      }
    },
    [encrypt]
  );

  const generateCode = useCallback(
    async (value) => {
      setLoading(true);
      setShowCode(true);

      if (value instanceof File) {
        const formData = new FormData();
        formData.append('image', value);

        try {
          const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            formData
          );
          const imageUrl = response.data.data.url;
          const shortUrl = await shortenUrl(imageUrl);
          setCodeValue(shortUrl);
        } catch (error) {
          console.error('Failed to upload image', error);
          setCodeValue(''); // Set to empty if image upload fails
        } finally {
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setShowCode(true);

      setTimeout(() => {
        setLoading(false);
        const processedValue = encrypt ? encryptValue(value) : value;
        setCodeValue(processedValue);
      }, 1000);
    },
    [apiKey, encrypt, shortenUrl]
  );

  const downloadCode = useCallback(() => {
    const qrSvg = codeRef.current?.querySelector('svg');
    const barcodeCanvas = codeRef.current?.querySelector('canvas');

    const downloadImage = (url, filename) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    };

    const generateFilename = () => `${Math.random().toString(36).substring(2, 15)}.png`;

    // Handle downloading QR code as PNG
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
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL('image/png');
        downloadImage(pngUrl, generateFilename());
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
