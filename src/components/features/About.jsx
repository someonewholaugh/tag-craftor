import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import Icon from '@/components/common/Icon';

const About = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                isIconOnly
                aria-label="Theme Switcher"
                variant="light"
                radius="sm"
                onClick={onOpen}
            >
                <Icon name="Info" />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="sm" backdrop="blur">
                <ModalContent>
                    <ModalHeader>
                        <h3 className="text-lg font-semibold">About</h3>
                    </ModalHeader>
                    <ModalBody className="space-y-2 font-light">
                        <p className="text-sm">
                            This project is a Barcode and QR Code generator created for the midterm
                            exam by Rafif Athallah.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            href="https://github.com/zangetsuuuu/tag-craftor"
                            as={Link}
                            target="_blank"
                            variant="flat"
                            radius="sm"
                            fullWidth
                            startContent={<Icon name="Github" size="16" />}
                        >
                            Github
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default About;
