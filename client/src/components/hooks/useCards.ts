import { useEffect, useState } from 'react';
import {
  addCardThunk,
  deleteCardThunk,
  getCardsThunk,
  updateCardThunk,
} from '../../redux/cards/cardAsyncAction';
import type { CardDataType, CardType } from '../../types/CardTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useCards(): {
  cards: CardType[];
  filteredCards: CardType[];
  cardSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteHandler: (id: CardType['id']) => void;
  editHandler: (id: CardType['id'], updatedCard: CardType) => void;
  filterHandler: (status: string) => void;
  updateStatusHandler: (id: CardType['id'], status: string) => void;
  selectedStatus: string | null;
} {
  const cards = useAppSelector((state) => state.cards.data);
  const dispatch = useAppDispatch();
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(getCardsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (selectedStatus) {
      setFilteredCards(cards.filter(card => card.status === selectedStatus));
    } else {
      setFilteredCards([]);
    }
  }, [cards, selectedStatus]);

  const cardSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(e.currentTarget)) as CardDataType;

    if (!data.description || typeof data.description !== 'string') {
      alert('Invalid description field');
      return;
    }

    void dispatch(addCardThunk(data));
    form.reset();
  };

  const deleteHandler = (id: CardType['id']): void => {
    void dispatch(deleteCardThunk(id));
  };

  const editHandler = (id: CardType['id'], updatedCard: CardType): void => {
    void dispatch(updateCardThunk({ id, updatedCard }));
  };

  const filterHandler = (status: string): void => {
    setSelectedStatus(status);
  };

  const updateStatusHandler = (id: CardType['id'], status: string): void => {
    const updatedCard = cards.find(card => card.id === id);
    if (updatedCard) {
      void dispatch(updateCardThunk({ id, updatedCard: { ...updatedCard, status } }));
    }
  };

  return { cards, filteredCards, cardSubmitHandler, deleteHandler, editHandler, filterHandler, updateStatusHandler, selectedStatus };
}
