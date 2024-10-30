import { Tooltip } from '@nextui-org/tooltip';
import { Button } from '@nextui-org/button';
import Icon from '@/components/common/Icon';

const FileUploader = ({ onUpload, isLoading }) => {
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) onUpload(file);
    };

    return (
        <div className="flex items-end w-1/6">
            <input
                type="file"
                accept="image/*"
                id="file-upload"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
            />
            <Tooltip content="Upload Image" radius="sm" closeDelay={0} showArrow>
                <Button
                    as="label"
                    htmlFor="file-upload"
                    variant="flat"
                    size="sm"
                    radius="sm"
                    className="w-full h-full"
                    isIconOnly
                    isDisabled={isLoading}
                >
                    <Icon name="Upload" />
                </Button>
            </Tooltip>
        </div>
    );
};

export default FileUploader;
