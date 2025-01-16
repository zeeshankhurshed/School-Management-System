import { apiSlice } from "./apiSlice";
import { SUBJECT_URL } from "../constant";

export const subjectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new subject
        createSubject: builder.mutation({
            query: (newSubject) => ({
                url: SUBJECT_URL,
                method: "POST",
                body: newSubject,
            }),
        }),
        // Update an existing subject
        updateSubject: builder.mutation({
            query: ({ id, updatedSubject }) => ({
                url: `${SUBJECT_URL}/${id}`,
                method: "PUT",
                body: updatedSubject,
            }),
        }),
        // Delete a subject
        deleteSubject: builder.mutation({
            query: (id) => ({
                url: `${SUBJECT_URL}/${id}`,
                method: "DELETE",
            }),
        }),
        // Fetch all subjects
        fetchSubjects: builder.query({
            query: () => SUBJECT_URL,
        }),
    }),
});

export const {
    useCreateSubjectMutation,
    useUpdateSubjectMutation,
    useDeleteSubjectMutation,
    useFetchSubjectsQuery,
} = subjectApiSlice;
