import QRCode from 'react-qr-code';
import type { ValueProps } from '@/types';

export const QrCode = ({ value }: ValueProps) => {
  return <QRCode value={value} size={96} level="M" viewBox="0 0 256 256" aria-label="QR code" />;
};
