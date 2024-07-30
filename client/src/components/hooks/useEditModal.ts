// hooks/useEditModal.ts
import { useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import type { CardType } from '../../types/CardTypes';
import { useUpdateCardMutation } from '../../redux/cards/apiSlice';

export default function useEditModal(card: CardType | null): {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleSave: () => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  status: string;
  setStatus: (status: string) => void;
} {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [updateCard] = useUpdateCardMutation();

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
      setStatus(card.status);
    }
  }, [card]);

  const handleSave = async (): Promise<void> => {
    if (card) {
      const updatedCard = { ...card, title, description, status };
      await updateCard({ id: card.id, updatedCard }).unwrap();
      onClose();
    }
  };

  return {
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
  };
}
