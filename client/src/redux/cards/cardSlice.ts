// import type { PayloadAction } from '@reduxjs/toolkit';
// import { createSlice } from '@reduxjs/toolkit';
// import type { CardType } from '../../types/CardTypes';
// import { addCardThunk, deleteCardThunk, getCardsThunk, updateCardThunk, getCardStatusThunk } from './cardAsyncAction';


// type InitialStateType ={
//   data: CardType[];
//   edit: CardType | null;
//   status: string | null;
// }

// const initialState: InitialStateType = {
//   data: [],
//   edit: null,
//   status: null,
// };

// const cardSlice = createSlice({
//   name: 'cards',
//   initialState,
//   reducers: {
//     editCard(state, {payload}: PayloadAction<CardType | null>) {
//       state.edit = payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getCardsThunk.fulfilled, (state, {payload}) => {
//         state.data = payload;
//       })
//       builder.addCase(addCardThunk.fulfilled, (state, {payload}) => {
//         state.data.push(payload);
//       })
//       builder.addCase(deleteCardThunk.fulfilled, (state, {payload}) => {
//         state.data = state.data.filter((card) => card.id !== payload);
//       })
//       builder.addCase(updateCardThunk.fulfilled, (state, {payload}) => {
//         state.data = state.data.map((card) => (card.id === payload.id ? payload : card));
//       })
//       builder.addCase(getCardStatusThunk.fulfilled, (state, { payload }) => {
//         state.status = payload.status;
//       });
//   },
// });

// export const {editCard} = cardSlice.actions;

// export default cardSlice;