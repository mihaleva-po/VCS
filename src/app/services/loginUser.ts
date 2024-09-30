import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginUserApi = createApi({
  reducerPath: 'loginUserApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      {
        token: string;
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
      },
      {
        username: string;
        password: string;
      }
    >({
      query: (credentials) => ({
        url: 'api/v1/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginUserApi;
