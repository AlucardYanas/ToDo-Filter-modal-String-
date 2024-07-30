import { useDisclosure } from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import type { CardType } from '../../types/CardTypes';
import { useUpdateCardMutation } from '../../redux/cards/apiSlice';

export default function useEditModal(cardProps: CardType | null): {
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
    if (cardProps) {
      setTitle(cardProps.title);
      setDescription(cardProps.description);
      setStatus(cardProps.status);
    }
  }, [cardProps]);

  const handleSave = (): void => {
    if (cardProps) {
      const updatedCard = { ...cardProps, title, description, status };
      updateCard({ id: cardProps.id, updatedCard }).unwrap()
        .then(() => onClose())
        .catch(error => {
          console.error('Failed to update card', error);
        });
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
