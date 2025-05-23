import { useState } from 'react';
import type { CardType } from '../../types/CardTypes';

interface UseEditModalReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleSave: () => void;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  status: CardType['status'];
  setStatus: (value: CardType['status']) => void;
}

export default function useEditModal(card: CardType): UseEditModalReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(card.title);
  const [description, setDescription] = useState<string>(card.description);
  const [status, setStatus] = useState<CardType['status']>(card.status);

  const onOpen = (): void => setIsOpen(true);
  const onClose = (): void => setIsOpen(false);

  const handleSave = (): void => {
    onClose();
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
