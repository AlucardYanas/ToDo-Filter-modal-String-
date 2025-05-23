import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';
import React, { memo } from 'react';
import type { CardType } from '../../types/CardTypes';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  status: CardType['status'];
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSave: () => void;
};

const EditModal = memo(
  ({
    isOpen,
    onClose,
    title,
    description,
    status,
    handleTitleChange,
    handleDescriptionChange,
    handleStatusChange,
    handleSave,
  }: EditModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="500px">
        <ModalHeader>Edit Card</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            mb={3}
          />
          <Input
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            mb={3}
          />
          <Select value={status} onChange={handleStatusChange}>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
);

export default EditModal;
