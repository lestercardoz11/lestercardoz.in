import {
  Button,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

const Resume = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const isEmailError = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const download = () => {
    const data = { name, email };

    fetch('/api/sheet', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      onClose();
      setName('');
      setEmail('');

      if (res.status === 201) {
        const anchor = document.createElement('a');
        anchor.href = 'resume.pdf';
        anchor.target = '_blank';
        anchor.click();
      } else {
        toast({
          title: 'Download failed',
          description: 'Unable to retreive PDF',
          status: 'error',
          variant: 'left-accent',
          duration: 9000,
          position: 'bottom-right',
          isClosable: true,
        });
      }
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        w={'full'}
        mt={8}
        bg={useColorModeValue('gray.300', 'gray.700')}
        color={useColorModeValue('gray.800', 'white')}
        rounded={'md'}
        _hover={{
          bg: useColorModeValue('gray.200', 'gray.800'),
          textDecoration: 'none',
        }}
        _focus={{ outline: 'none' }}>
        Download Résumé
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Download Résumé</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={handleNameChange} />
            </FormControl>

            <FormControl mt={4} isInvalid={email && isEmailError}>
              <FormLabel>Email</FormLabel>
              <Input type='email' value={email} onChange={handleEmailChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={download}
              colorScheme='blue'
              mr={3}
              disabled={!name || !email || isEmailError}>
              Download
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Resume;
