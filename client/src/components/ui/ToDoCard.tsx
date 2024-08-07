import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Flex,
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
  Input,
  Select,
} from '@chakra-ui/react';
import type { CardType } from '../../types/CardTypes';
import useEditModal from '../hooks/useEditModal';

type CardTypes = {
  card: CardType;
  deleteHandler: (id: CardType['id']) => void;
  updateStatusHandler: (id: CardType['id'], status: string) => void;
};

export default function ToDoCard({
  card,
  deleteHandler,
  updateStatusHandler,
}: CardTypes): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose,
    handleSave,
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
  } = useEditModal(card);

  return (
    <>
      <Card>
        <CardBody>
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <Text>{card.title}</Text>
              <Text>{card.description}</Text>
              <Text>{card.status}</Text>
            </Flex>
            <Flex>
              <Button colorScheme="blue" onClick={onOpen} mr={2}>
                Edit
              </Button>
              <Button colorScheme="red" onClick={() => deleteHandler(card.id)}>
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
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
