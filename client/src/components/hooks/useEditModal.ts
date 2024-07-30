import { useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import type { CardType } from '../../types/CardTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { updateCardThunk } from '../../redux/cards/cardAsyncAction';
import { setStatus } from '../../redux/cards/cardSlice';

export default function useEditModal(card: CardType | null): {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleSave: () => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  cardStatus: string;
  setCardStatus: (status: string) => void;
  filterStatus: string | null;
  setFilterStatus: (status: string | null) => void;
} {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cardStatus, setCardStatus] = useState('');
  const dispatch = useAppDispatch();
  const filterStatus = useAppSelector((state) => state.cards.status);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
      setCardStatus(card.status);
    }
  }, [card]);

  const handleSave = (): void => {
    if (card) {
      const updatedCard = { ...card, title, description, status: cardStatus };
      void dispatch(updateCardThunk({ id: card.id, updatedCard }));
      onClose();
    }
  };

  const setFilterStatus = (newCardStatus: string | null): void => {
    dispatch(setStatus(newCardStatus));
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
    cardStatus,
    setCardStatus,
    filterStatus,
    setFilterStatus,
  };
}
