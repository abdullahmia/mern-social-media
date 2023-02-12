import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (header, { getState }) => {
      let token = getState()?.auth?.token;
      header.set("Authorization", token);
      return header;
    },
  }),
  endpoints: (builder) => ({}),
});
