import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const customBaseQuery = fetchBaseQuery({ baseUrl: '/api' });

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await customBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 'PARSING_ERROR') {
    if (result.error.data === 'OK') {
      return { data: 'OK' }; // Или любое другое значение, которое вы ожидаете
    }
  }
  return result;
};

export default baseQuery;
