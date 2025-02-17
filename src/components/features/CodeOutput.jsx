import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import Barcode from '@/components/results/Barcode';
import QrCode from '@/components/results/QrCode';

const CodeOutput = ({ codeValue, codeType, onDownload, isLoading, codeRef }) => {
  const renderCode = () => {
    if (!codeValue) return <p className="text-sm text-red-400">Error generating {codeType}</p>;

    return (
      <div ref={codeRef}>
        {codeType === 'Barcode' ? <Barcode value={codeValue} /> : <QrCode value={codeValue} />}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <Card radius="sm">
        <CardBody>
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <div className="flex flex-col items-center space-y-2">
              {renderCode()}
              {codeValue && (
                <Button
                  variant="light"
                  size="sm"
                  radius="sm"
                  className="w-fit"
                  onClick={onDownload}
                >
                  Download
                </Button>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CodeOutput;
