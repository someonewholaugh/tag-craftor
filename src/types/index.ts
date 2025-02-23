import { ReactNode, RefObject, MutableRefObject } from 'react';
import { icons } from 'lucide-react';

export interface ChildrenProps {
  children: ReactNode;
}

export interface LayoutProps extends ChildrenProps {
  className?: string;
}

export interface HeaderProps extends ChildrenProps {
  title?: string;
  type?: string;
  setType?: (type: 'QrCode' | 'Barcode') => void;
}

export interface ModalProps extends ChildrenProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IconProps {
  name: keyof typeof icons;
  title?: string;
  color?: string;
  size?: number;
  className?: string;
  noHover?: boolean;
}

export interface FileUploaderProps {
  onUpload: (file: File) => void;
  onFileAdded: (hasFile: boolean) => void;
  isLoading: boolean;
  encrypt: boolean;
  setEncrypt: (value: boolean) => void;
}

export interface CodeOutputProps {
  codeValue: string | null;
  codeType: string;
  onDownload: () => void;
  isLoading: boolean;
  codeRef: RefObject<HTMLDivElement>;
}

export interface UserInputProps {
  codeType: string;
}

export interface ValueProps {
  value: string;
}

export interface UseCodeGeneratorReturn {
  codeValue: string;
  loading: boolean;
  showCode: boolean;
  generateCode: (value: string | File) => Promise<void>;
  downloadCode: () => void;
  codeRef: MutableRefObject<HTMLDivElement | null>;
}

export interface HistoryItem {
  id: string;
  value: string;
  codeType: string;
  timestamp: number;
}
