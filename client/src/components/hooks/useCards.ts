import { useEffect, useState } from 'react';
import {
  useGetCardsQuery,
  useAddCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation
} from '../../redux/cards/apiSlice';
import type { CardType, CardDataType } from '../../types/CardTypes';

export default function useCards(): {
  cards: CardType[];
  filteredCards: CardType[];
  cardSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  deleteHandler: (id: number) => Promise<void>;
  editHandler: (id: number, updatedCard: CardType) => Promise<void>;
  filterHandler: (status: string) => void;
  updateStatusHandler: (id: number, status: string) => Promise<void>;
  selectedStatus: string | null;
} {
  const { data: cards = [], refetch } = useGetCardsQuery();
  const [addCard] = useAddCardMutation();
  const [updateCard] = useUpdateCardMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    if (selectedStatus) {
      setFilteredCards(cards.filter(card => card.status === selectedStatus));
    } else {
      setFilteredCards(cards);
    }
  }, [cards, selectedStatus]);

  const cardSubmitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(e.currentTarget)) as CardDataType;

    if (!data.description || typeof data.description !== 'string') {
      alert('Invalid description field');
      return;
    }

    try {
      await addCard(data).unwrap();
      form.reset();
      void refetch();
    } catch (error) {
      console.error('Failed to add card', error);
    }
  };

  const deleteHandler = async (id: number): Promise<void> => {
    try {
      await deleteCard(id).unwrap();
      void refetch();
    } catch (error) {
      console.error('Failed to delete card', error);
    }
  };

  const editHandler = async (id: number, updatedCard: CardType): Promise<void> => {
    try {
      await updateCard({ id, updatedCard }).unwrap();
      void refetch();
    } catch (error) {
      console.error('Failed to edit card', error);
    }
  };

  const filterHandler = (status: string): void => {
    setSelectedStatus(status);
  };

  const updateStatusHandler = async (id: number, status: string): Promise<void> => {
    const updatedCard = cards.find(card => card.id === id);
    if (updatedCard) {
      try {
        await updateCard({ id, updatedCard: { ...updatedCard, status } }).unwrap();
        void refetch();
      } catch (error) {
        console.error('Failed to update status', error);
      }
    }
  };

  return { cards, filteredCards, cardSubmitHandler, deleteHandler, editHandler, filterHandler, updateStatusHandler, selectedStatus };
}
