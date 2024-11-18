import { Card, CardBody } from '@nextui-org/card';
import { Spinner } from '@nextui-org/spinner';
import { Button } from '@nextui-org/button';
import Barcode from '@/components/results/Barcode';
import QrCode from '@/components/results/QrCode';

const CodeOutput = ({ codeValue, codeType, onDownload, isLoading, codeRef }) => (
  <div className="space-y-2">
    <Card radius="sm">
      <CardBody>
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div ref={codeRef}>
              {codeType === 'Barcode' ? (
                <Barcode value={codeValue} />
              ) : (
                <QrCode value={codeValue} />
              )}
            </div>
            <Button variant="light" size="sm" radius="sm" className="w-fit" onClick={onDownload}>
              Download
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  </div>
);

export default CodeOutput;
