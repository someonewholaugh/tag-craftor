import QRCode from 'react-qr-code';

const QrCode = ({ value }) => {
    return (
        <div className="w-auto h-auto p-2 mx-auto bg-white">
            <QRCode
                value={value}
                size={96}
                level="M"
                viewBox={`0 0 256 256`}
                aria-label="QR code"
            />
        </div>
    );
};

export default QrCode;
