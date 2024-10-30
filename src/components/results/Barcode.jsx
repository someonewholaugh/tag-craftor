import ReactBarcode from 'react-barcode';

const Barcode = ({ value }) => {
    return (
        <ReactBarcode
            value={value}
            displayValue={false}
            width={1}
            renderer="canvas"
            className="mx-auto"
        />
    );
};

export default Barcode;
