import { useState, useCallback } from 'react';
import { Button, Field, Input } from '@headlessui/react';
import { CodeOutput, FileUploader, Icon } from '@/components';
import { useCodeGenerator } from '@/hooks';
import { cn, saveToHistory } from '@/utils';
import type { UserInputProps } from '@/types';

export const UserInput = ({ codeType }: UserInputProps) => {
  const [value, setValue] = useState<string>('');
  const [encrypt, setEncrypt] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const [hasImage, setHasImage] = useState<boolean>(false);
  const { codeValue, loading, showCode, generateCode, downloadCode, codeRef } =
    useCodeGenerator(encrypt);

  const handleGenerate = useCallback(() => {
    if (!value && !hasImage) return;

    const inputValue = hasImage && !value ? 'Image Generated' : value;
    generateCode(inputValue, (finalValue) => saveToHistory(finalValue, codeType, encrypt));
  }, [value, hasImage, generateCode, codeType, encrypt]);

  return (
    <div className="w-full space-y-4">
      <Field className="relative w-full">
        <Input
          type="text"
          className="w-full p-3 text-sm transition-colors duration-300 rounded-md bg-zinc-100 dark:bg-zinc-900 focus:outline-0 focus:bg-zinc-200 dark:focus:bg-zinc-800 disabled:cursor-not-allowed"
          value={hasImage ? '' : value}
          disabled={loading || hasImage}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder={hasImage ? 'Already added an Image' : 'Enter your text here...'}
          autoComplete="off"
        />
        <div
          className={cn(
            'absolute inset-y-0 right-0 px-2 rounded-e-md flex items-center space-x-3 transition-colors duration-300',
            focused ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-zinc-100 dark:bg-zinc-900'
          )}
        >
          <Button className="cursor-pointer" onClick={() => setEncrypt((prev) => !prev)}>
            <Icon
              title={encrypt ? 'Encrypted' : 'Encrypt'}
              name={encrypt ? 'Lock' : 'LockOpen'}
              className={cn(encrypt && 'text-blue-500')}
            />
          </Button>
          <FileUploader
            onUpload={(file) =>
              generateCode(file, (finalValue) => saveToHistory(finalValue, codeType, encrypt))
            }
            onFileAdded={setHasImage}
            isLoading={loading}
            encrypt={encrypt}
            setEncrypt={setEncrypt}
          />
        </div>
      </Field>

      <Button
        onClick={handleGenerate}
        disabled={loading || (value && hasImage) || (!value && hasImage) || !value}
        className="w-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out bg-black rounded-md cursor-pointer dark:bg-white dark:text-black disabled:bg-zinc-400 disabled:cursor-not-allowed hover:bg-zinc-700 dark:hover:bg-zinc-300 dark:disabled:bg-zinc-600"
      >
        {loading
          ? 'Generating...'
          : hasImage
          ? 'Upload image via the modal to proceed'
          : 'Generate'}
      </Button>

      {showCode && (
        <CodeOutput
          codeValue={codeValue}
          codeType={codeType}
          onDownload={downloadCode}
          isLoading={loading}
          codeRef={codeRef}
        />
      )}
    </div>
  );
};
