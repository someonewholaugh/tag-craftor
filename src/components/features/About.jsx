import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Icon from '@/components/common/Icon';

const About = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly aria-label="Theme Switcher" variant="light" radius="sm" onClick={onOpen}>
        <Icon name="Info" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="sm" backdrop="blur">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold">About</h3>
          </ModalHeader>
          <ModalBody className="font-normal">
            <p className="space-y-2 text-sm text-justify text-foreground/80">
              Tag Craftor is a tool that generates barcodes and QR codes from text or images. It
              also encrypts data using AES encryption to keep it secure.
            </p>
            <p className="text-sm text-justify text-foreground/80">
              It also has a scanner that can read both barcodes and QR codes, including encrypted
              ones, for quick access to your data.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              href="https://github.com/zangetsuuuu/tag-craftor"
              as={Link}
              target="_blank"
              color="primary"
              radius="sm"
              fullWidth
              startContent={<Icon name="Github" size="16" />}
            >
              View on GitHub
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default About;
