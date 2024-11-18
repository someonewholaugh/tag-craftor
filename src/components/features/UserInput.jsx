import { useState } from 'react';
import { useCodeGenerator } from '@/hooks';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import FileUploader from '@/components/features/FileUploader';
import CodeOutput from '@/components/features/CodeOutput';

const UserInput = ({ codeType }) => {
  const [value, setValue] = useState('');
  const [encrypt, setEncrypt] = useState(false);

  const { codeValue, loading, showCode, generateCode, downloadCode, codeRef } =
    useCodeGenerator(encrypt);

  const handleGenerate = () => generateCode(value);
  
  return (
    <div className="w-full space-y-4">
      <div className="flex w-full space-x-2">
        <Input
          type="text"
          label={`${codeType} value`}
          className="w-5/6"
          variant="flat"
          size="sm"
          radius="sm"
          value={value}
          isDisabled={loading}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <FileUploader onUpload={generateCode} isLoading={loading} />
      </div>

      <div className="flex space-x-8">
        <Checkbox
          radius="sm"
          isSelected={encrypt}
          isDisabled={loading}
          onChange={(e) => setEncrypt(e.target.checked)}
        >
          <span className="text-sm">Encrypt</span>
        </Checkbox>
        <Button
          variant="flat"
          radius="sm"
          fullWidth
          onClick={handleGenerate}
          isDisabled={loading || !value}
        >
          Generate
        </Button>
      </div>

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

export default UserInput;
