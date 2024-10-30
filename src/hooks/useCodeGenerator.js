import { useState, useRef } from 'react';
import axios from 'axios';

export const useCodeGenerator = () => {
    const [codeValue, setCodeValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const codeRef = useRef();

    const shortenUrl = async (url) => {
        try {
            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
            return response.data;
        } catch {
            return url;
        }
    };

    const generateCode = async (value) => {
        setLoading(true);
        setShowCode(true);

        if (value instanceof File) {
            const formData = new FormData();
            formData.append('image', value);

            try {
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    formData
                );
                const imageUrl = response.data.data.url;
                const shortUrl = await shortenUrl(imageUrl);
                setCodeValue(shortUrl);
            } catch {
                console.error('Failed to upload image');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(true);
            setShowCode(true);

            setTimeout(() => {
                setLoading(false);
                setCodeValue(value);
            }, 1000);
        }
    };

    const downloadCode = () => {
        const qrSvg = codeRef.current?.querySelector('svg');
        const barcodeCanvas = codeRef.current?.querySelector('canvas');

        const downloadImage = (url, filename) => {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
        };

        const generateFilename = () => `${generateRandomString()}.png`;

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
    };

    const generateRandomString = () => {
        return Math.random().toString(36).substring(2, 15);
    };

    return { codeValue, loading, showCode, generateCode, downloadCode, codeRef };
};
