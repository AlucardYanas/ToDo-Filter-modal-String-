import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Flex,
  Text,
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
};

export default function ToDoCard({
  card,
  deleteHandler,
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
    cardStatus,
    setCardStatus,
  } = useEditModal(card);

  return (
    <>
      <Card>
        <CardBody>
          <Flex justify="space-between" align="center">
            <Flex direction="column">
              <Text fontWeight="bold">{card.title}</Text>
              <Text>{card.description}</Text>
              <Text>Status: {card.status}</Text>
            </Flex>
            <Flex direction="column" align="flex-end">
              <Button colorScheme="blue" onClick={onOpen} mb={2}>
                Edit
              </Button>
              <Button colorScheme="red" onClick={() => deleteHandler(card.id)} mb={2}>
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
              value={cardStatus}
              onChange={(e) => setCardStatus(e.target.value)}
              placeholder="Select status"
            >
              <option value="New">New</option>
              <option value="Pending">Pending</option>
              <option value="Fulfilled">Fulfilled</option>
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
