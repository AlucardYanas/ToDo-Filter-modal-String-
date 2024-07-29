import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Flex,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
} from '@chakra-ui/react';
import type { CardType } from '../../types/CardTypes';

type CardTypes = {
  card: CardType;
  deleteHandler: (id: CardType['id']) => void;
  editHandler: (id: CardType['id'], updatedCard: CardType) => void;
  updateStatusHandler: (id: CardType['id'], status: string) => void;
};

export default function ToDoCard({
  card,
  deleteHandler,
  editHandler,
  updateStatusHandler,
}: CardTypes): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [status, setStatus] = useState(card.status);

  const handleSave = (): void => {
    editHandler(card.id, { ...card, title, description, status });
    onClose();
  };

  return (
    <>
      <Card onClick={onOpen} cursor="pointer">
        <CardBody>
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <Text>{card.title}</Text>
              <Text>{card.description}</Text>
              <Text>{card.status}</Text>
            </Flex>
            <Flex>
              <Button colorScheme="red" onClick={(e) => { e.stopPropagation(); deleteHandler(card.id); }}>
                Delete
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              mb={3}
            />
            <Input
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              mb={3}
            />
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Select status"
            >
              <option value="Новая">Новая</option>
              <option value="В обработке">В обработке</option>
              <option value="Завершена">Завершена</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Edit
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}