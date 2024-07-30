import { useEffect, useState } from 'react';
import { 
  useGetCardsQuery, 
  useAddCardMutation, 
  useUpdateCardMutation, 
  useDeleteCardMutation 
} from '../../redux/cards/apiSlice';
import type { CardType, CardDataType } from '../../types/CardTypes';

export default function useCards(): JSX.Element {
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
      setFilteredCards([]);
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

    await addCard(data).unwrap();
    form.reset();
    refetch();
  };

  const deleteHandler = async (id: number): Promise<void> => {
    await deleteCard(id).unwrap();
    refetch();
  };

  const editHandler = async (id: number, updatedCard: CardType): Promise<void> => {
    await updateCard({ id, updatedCard }).unwrap();
    refetch();
  };

  const filterHandler = (status: string): void => {
    setSelectedStatus(status);
  };

  const updateStatusHandler = async (id: number, status: string): Promise<void> => {
    const updatedCard = cards.find(card => card.id === id);
    if (updatedCard) {
      await updateCard({ id, updatedCard: { ...updatedCard, status } }).unwrap();
      refetch();
    }
  };

  return { cards, filteredCards, cardSubmitHandler, deleteHandler, editHandler, filterHandler, updateStatusHandler, selectedStatus };
}
