import type {  PayloadAction } from '@reduxjs/toolkit';
import{ createSlice} from '@reduxjs/toolkit';
import type { CardType } from '../../types/CardTypes';
import { 
  addCardThunk, 
  deleteCardThunk, 
  getCardsThunk, 
  updateCardThunk, 
  // getCardStatusThunk,
  getCardsByStatusThunk 
} from './cardAsyncAction';

type InitialStateType = {
  data: CardType[];
  filteredData: CardType[]; // Добавьте состояние для отфильтрованных карточек
  edit: CardType | null;
  status: string | null;
};

const initialState: InitialStateType = {
  data: [],
  filteredData: [], // Инициализируйте как пустой массив
  edit: null,
  status: null,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    editCard(state, { payload }: PayloadAction<CardType | null>) {
      state.edit = payload;
    },
    setFilteredCards(state, { payload }: PayloadAction<CardType[]>) {
      state.filteredData = payload;
    },
    setStatus(state, { payload }: PayloadAction<string | null>) {  // New action to set status
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCardsThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
    builder.addCase(addCardThunk.fulfilled, (state, { payload }) => {
      state.data.push(payload);
    });
    builder.addCase(deleteCardThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.filter((card) => card.id !== payload);
    });
    builder.addCase(updateCardThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.map((card) => (card.id === payload.id ? payload : card));
    });

    builder.addCase(getCardsByStatusThunk.fulfilled, (state, { payload }) => {
      state.filteredData = payload;
    });
  },
});

export const { editCard, setFilteredCards, setStatus } = cardSlice.actions;

export default cardSlice.reducer;
