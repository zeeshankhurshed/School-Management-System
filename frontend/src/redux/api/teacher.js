import { apiSlice } from "./apiSlice";
import { TEACHER_URL, UPLOAD_URL } from "../constant";

export const teacherApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTeachers: builder.query({
            query: ({ search = '', page = 1, limit = 10 } = {}) => ({
              url: `${TEACHER_URL}?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }),
          }),
                
        createTeachers: builder.mutation({
            query: (newTeacher) => ({
                url: `${TEACHER_URL}`,
                method: 'POST',
                body: newTeacher,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        updateTeacher: builder.mutation({
            query: ({ id, ...data }) => ({
              url: `${TEACHER_URL}/${id}`,
              method: 'PUT',
              body: data,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }),
          }),          
        getSpecificTeacher: builder.query({
            query: (id) => ({
                url: `${TEACHER_URL}/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        deleteTeacher: builder.mutation({
            query: (id) => ({
                url: `${TEACHER_URL}/${id}`,
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
    useCreateTeachersMutation,
    useDeleteTeacherMutation,
    useGetAllTeachersQuery,
    useGetSpecificTeacherQuery,
    useUpdateTeacherMutation,
    useUploadImageMutation,
} = teacherApiSlice;
