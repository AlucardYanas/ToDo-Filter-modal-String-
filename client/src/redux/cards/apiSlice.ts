import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CardType, CardDataType } from '../../types/CardTypes';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Убедитесь, что baseUrl правильный
  endpoints: (builder) => ({
    getCards: builder.query<CardType[], void>({
      query: () => '/cards',
    }),
    addCard: builder.mutation<CardType, CardDataType>({
      query: (newCard) => ({
        url: '/cards',
        method: 'POST',
        body: newCard,
      }),
    }),
    updateCard: builder.mutation<CardType, { id: number, updatedCard: CardType }>({
      query: ({ id, updatedCard }) => ({
        url: `/cards/${id}`,
        method: 'PUT',
        body: updatedCard,
      }),
    }),
    deleteCard: builder.mutation<void, number>({
      query: (id) => ({
        url: `/cards/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCardsQuery,
  useAddCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = apiSlice;
