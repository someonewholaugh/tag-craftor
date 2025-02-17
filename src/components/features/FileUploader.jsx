import { useState } from 'react';
import { Modal, ModalHeader, ModalContent, ModalBody, useDisclosure } from "@heroui/modal";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Checkbox } from "@heroui/checkbox";
import Icon from '@/components/common/Icon';

const FileUploader = ({ onUpload, isLoading, encrypt, setEncrypt }) => {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const showImagePreview = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => (image ? onUpload(image) : null);

  const removePreview = () => setPreview(null);

  return (
    <>
      <div className="flex items-end w-1/6">
        <Tooltip content="Upload Image" radius="sm" closeDelay={0} showArrow>
          <Button
            variant="flat"
            size="sm"
            radius="sm"
            className="w-full h-full"
            isIconOnly
            isDisabled={isLoading}
            onClick={onOpen}
          >
            <Icon name="ImageUp" />
          </Button>
        </Tooltip>
      </div>
      <Modal radius="sm" size="lg" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="pb-0 ps-4">Upload Image</ModalHeader>
              <ModalBody className="p-4">
                {preview ? (
                  <div
                    className="relative flex justify-center w-full h-full bg-cover rounded-md"
                    style={{ backgroundImage: `url(${preview})` }}
                  >
                    <Image
                      src={preview}
                      alt="Image Preview"
                      radius="md"
                      className="object-contain w-full max-h-[26rem] z-10"
                    />
                    <div className="absolute inset-0 h-full rounded-md z-5 backdrop-blur-md bg-black/20"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center py-6">
                        <Icon name="Upload" size={24} />
                        <div className="mt-4 space-y-1 text-center">
                          <p className="text-sm font-semibold text-foreground-800">
                            Click to upload
                          </p>
                          <p className="text-xs text-foreground-600">SVG, PNG, JPG or GIF</p>
                        </div>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={showImagePreview}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {preview && (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="grid items-center w-full grid-cols-2">
                      <Checkbox
                        radius="sm"
                        isSelected={encrypt}
                        isDisabled={isLoading}
                        onChange={(e) => setEncrypt(e.target.checked)}
                      >
                        <span className="text-sm">Encrypt</span>
                      </Checkbox>
                      <Button
                        variant="flat"
                        radius="sm"
                        size="sm"
                        className="justify-self-end"
                        onClick={removePreview}
                      >
                        <Icon name="ImageOff" size={16} />
                        <p className="text-sm">Remove Image</p>
                      </Button>
                    </div>
                    <Button
                      color="primary"
                      radius="sm"
                      onClick={() => {
                        handleImageUpload();
                        onClose();
                      }}
                      isDisabled={isLoading}
                      fullWidth
                    >
                      Upload
                    </Button>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileUploader;
