import { apiSlice } from "./apiSlice";
import { CLASSES_URL } from "../constant";

export const classesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Mutation to create a new class
        createClass: builder.mutation({
            query: (newClass) => ({
                url: CLASSES_URL,
                method: "POST",
                body: newClass,
            }),
        }),

        // Mutation to update an existing class
        updateClass: builder.mutation({
            query: ({ id, updatedClass }) => ({
              url: `${CLASSES_URL}/${id}`, // Endpoint for updating class
              method: "PUT",
              body: updatedClass, // Send updated data as the request body
            }),
          }),

        // Mutation to delete a class
        deleteClass: builder.mutation({
            query: (id) => ({
                url: `${CLASSES_URL}/${id}`,
                method: "DELETE",
            }),
        }),

        // Query to fetch all classes
        fetchClasses: builder.query({
            query: () => CLASSES_URL,
        }),
    }),
});

// Exporting hooks for components to use
export const {
    useCreateClassMutation,
    useUpdateClassMutation,
    useDeleteClassMutation,
    useFetchClassesQuery,
} = classesApiSlice;
