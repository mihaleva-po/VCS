import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerUserApi = createApi({
  reducerPath: 'registerUserApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      { authenticated: boolean },
      {
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
      }
    >({
      query: (credentials) => ({
        url: 'api/v1/auth/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = registerUserApi;
