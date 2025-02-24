import { useState, useCallback, ChangeEvent } from 'react';
import { Button } from '@headlessui/react';
import { Icon, Modal } from '@/components';
import type { FileUploaderProps } from '@/types';

export const FileUploader = ({
  onUpload,
  onFileAdded,
  isLoading,
  encrypt,
  setEncrypt,
}: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      onFileAdded?.(true);
    }
  };

  const handleImageUpload = useCallback(() => {
    if (image) {
      onUpload(image);
      setIsOpen(false);
    }
  }, [image, onUpload]);

  const removePreview = () => {
    setPreview(null);
    setImage(null);
    onFileAdded?.(false);
  };

  return (
    <>
      {preview ? (
        <img
          src={preview}
          title="Click to Edit Image"
          alt="Image Preview"
          className="object-cover transition-all duration-300 ease-in-out rounded-full cursor-pointer size-6 hover:brightness-75 hover:scale-105"
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <Button className="cursor-pointer" onClick={() => setIsOpen(true)} disabled={isLoading}>
          <Icon title="Add Image" name="ImagePlus" />
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Upload Image">
        <div className="w-full space-y-4">
          {preview ? (
            <div className="relative">
              <div
                className="relative flex justify-center w-full h-full bg-cover rounded-md"
                style={{ backgroundImage: `url(${preview})` }}
              >
                <img
                  src={preview}
                  alt="Image Preview"
                  className="object-contain w-full max-h-[26rem] z-10 rounded-md"
                />
                <div className="absolute inset-0 z-0 h-full rounded-md backdrop-blur-md bg-black/20"></div>
                <div className="absolute inset-x-0 bottom-0 z-20 flex items-center w-full">
                  <Button
                    className="inline-flex items-center justify-center w-4/5 py-3 space-x-2 text-white transition-colors duration-300 ease-in-out border-r cursor-pointer border-white/30 bg-black/20 backdrop-blur-md rounded-bl-md hover:bg-black/40"
                    onClick={() => setEncrypt(!encrypt)}
                    aria-label={encrypt ? 'Disable Encryption' : 'Enable Encryption'}
                  >
                    <Icon name={encrypt ? 'Lock' : 'LockOpen'} size={16} noHover />
                    <span className="text-xs">{encrypt ? 'Encrypted' : 'Encrypt'}</span>
                  </Button>
                  <Button
                    title="Remove Image"
                    className="inline-flex items-center justify-center w-1/5 py-3 space-x-2 text-white transition-colors duration-300 ease-in-out cursor-pointer bg-black/20 backdrop-blur-md rounded-br-md hover:bg-red-500"
                    onClick={removePreview}
                    aria-label="Remove Image"
                  >
                    <Icon name="Trash" size={16} noHover />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-64 transition duration-300 bg-white border-2 border-dashed rounded-md cursor-pointer dark:bg-black hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <div className="flex flex-col items-center justify-center py-6">
                  <Icon name="Upload" size={28} />
                  <div className="mt-4 space-y-1 text-center">
                    <p className="text-sm font-semibold">Click to upload</p>
                    <p className="text-xs text-zinc-500">SVG, PNG, JPG or GIF</p>
                  </div>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImagePreview}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {preview && (
            <Button
              onClick={handleImageUpload}
              disabled={isLoading}
              className="w-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out bg-black rounded-md cursor-pointer dark:bg-white dark:text-black disabled:bg-zinc-400 disabled:cursor-not-allowed hover:bg-zinc-700 dark:hover:bg-zinc-300 dark:disabled:bg-zinc-600"
            >
              Upload
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};
