import { apiSlice } from "./apiSlice";
import { STUDENT_URL,UPLOAD_URL } from "../constant";


export const studentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: ({ search = '', page = 1, limit = 10 } = {}) => ({
              url: `${STUDENT_URL}?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }),
          }),
          
        createStudents: builder.mutation({
            query: (newStudent) => ({
                url: `${STUDENT_URL}`,
                method: 'POST',
                body: newStudent,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        updateStudent: builder.mutation({
            query: ({ id, ...data }) => ({
                        url: `${STUDENT_URL}/${id}`,
                        method: 'PUT',
                        body: data,
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                      }),
        }),
        getSpecificStudent: builder.query({
            query: (id) => ({
                url: `${STUDENT_URL}/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `${STUDENT_URL}/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        uploadImage: builder.mutation({
            query: (formData) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
    }),
});

export const {
    useCreateStudentsMutation,
    useDeleteStudentMutation,
    useGetAllStudentsQuery,
    useGetSpecificStudentQuery,
    useUpdateStudentMutation,
    useUploadImageMutation,
} = studentApiSlice;
