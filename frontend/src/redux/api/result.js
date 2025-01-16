import { apiSlice } from "./apiSlice";
import { RESULT_URL } from "../constant";

export const resultApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllResults: builder.query({
            query: ({ search = '', page = 1, limit = 10 } = {}) => ({
              url: `${RESULT_URL}?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
            }),
          }),
                
        createResult: builder.mutation({
            query: (newResult) => ({
                url: `${RESULT_URL}`,
                method: 'POST',
                body: newResult,
            }),
        }),
        getSpecificResult: builder.query({
            query: (id) => ({
                url: `${RESULT_URL}/${id}`,
            }),
        }),
        updateResult: builder.mutation({
            query: ({ id, updatedResult }) => ({
              url: `${RESULT_URL}/${id}`,
              method: "PUT",
              body: updatedResult,
            }),
          }),        
        // Frontend - deleteResult mutation
        deleteResult: builder.mutation({
            query: (studentId) => ({
                url: `${RESULT_URL}/${studentId}`, // Correctly pass studentId
                method: 'DELETE',
            }),
        }),

    }),
});

export const {
    useCreateResultMutation,
    useGetAllResultsQuery,
    useGetSpecificResultQuery,
    useDeleteResultMutation,
    useUpdateResultMutation,
} = resultApiSlice;
