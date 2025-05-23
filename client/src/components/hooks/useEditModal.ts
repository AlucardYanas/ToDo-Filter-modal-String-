import { useState } from 'react';
import type { CardType } from '../../types/CardTypes';

export default function useEditModal(card: CardType): {
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
} {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [status, setStatus] = useState(card.status);

  const onOpen = (): void => setIsOpen(true);
  const onClose = (): void => setIsOpen(false);

  const handleSave = (): void => {
    // Здесь будет логика сохранения
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
