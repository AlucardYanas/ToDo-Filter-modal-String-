import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  addCardThunk,
  deleteCardThunk,
  getCardsThunk,
  updateCardThunk,
} from '../../redux/cards/cardAsyncAction';
import type { CardDataType, CardType, CardStatus } from '../../types/CardTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useCards(): {
  cards: CardType[];
  filteredCards: CardType[];
  cardSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteHandler: (id: CardType['id']) => void;
  editHandler: (id: CardType['id'], updatedCard: CardType) => void;
  filterHandler: (status: CardStatus | 'all') => void;
  updateStatusHandler: (id: CardType['id']) => void;
  selectedStatus: CardStatus | 'all' | null;
} {
  const cards = useAppSelector((state) => state.cards.data);
  const dispatch = useAppDispatch();
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<CardStatus | 'all' | null>(null);

  // Мемоизируем фильтрацию карточек
  const filterCards = useCallback(
    (status: CardStatus | 'all' | null) => {
      if (!status) return [];
      if (status === 'all') return cards;
      return cards.filter((card) => card.status === status);
    },
    [cards],
  );

  // Используем useMemo для фильтрованных карточек
  const memoizedFilteredCards = useMemo(
    () => filterCards(selectedStatus),
    [filterCards, selectedStatus],
  );

  useEffect(() => {
    setFilteredCards(memoizedFilteredCards);
  }, [memoizedFilteredCards]);

  // Загружаем карточки только один раз при монтировании
  useEffect(() => {
    void dispatch(getCardsThunk());
  }, [dispatch]);

  const cardSubmitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const data = Object.fromEntries(new FormData(e.currentTarget)) as CardDataType;

      if (!data.description || typeof data.description !== 'string') {
        alert('Invalid description field');
        return;
      }

      void dispatch(addCardThunk(data));
      form.reset();
    },
    [dispatch],
  );

  const deleteHandler = useCallback(
    (id: CardType['id']): void => {
      void dispatch(deleteCardThunk(id));
    },
    [dispatch],
  );

  const editHandler = useCallback(
    (id: CardType['id'], updatedCard: CardType): void => {
      void dispatch(updateCardThunk({ id, updatedCard }));
    },
    [dispatch],
  );

  const filterHandler = useCallback((status: CardStatus | 'all'): void => {
    setSelectedStatus(status);
  }, []);

  const updateStatusHandler = useCallback(
    (id: CardType['id']): void => {
      const updatedCard = cards.find((card) => card.id === id);
      if (updatedCard) {
        const newStatus = updatedCard.status === 'completed' ? 'active' : 'completed';
        void dispatch(updateCardThunk({ id, updatedCard: { ...updatedCard, status: newStatus } }));
      }
    },
    [cards, dispatch],
  );

  return {
    cards,
    filteredCards,
    cardSubmitHandler,
    deleteHandler,
    editHandler,
    filterHandler,
    updateStatusHandler,
    selectedStatus,
  };
}
