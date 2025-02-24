import ReactBarcode from 'react-barcode';
import type { ValueProps } from '@/types';

export const Barcode = ({ value }: ValueProps) => {
  return <ReactBarcode value={value} displayValue={false} width={1} renderer="canvas" />;
};
