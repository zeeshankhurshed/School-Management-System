import { BLOG_URL, UPLOAD_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // School News Endpoints
    getAllSchoolNews: builder.query({
      query: () => ({
        url: `${BLOG_URL}/school-news`,
      }),
    }),
    createSchoolNews: builder.mutation({
      query: (newSchoolNews) => ({
        url: `${BLOG_URL}/school-news`,
        method: "POST",
        body: newSchoolNews,
      }),
    }),
    getSpecificNews: builder.query({
      query: (id) => ({
        url: `${BLOG_URL}/school-news/${id}`,
      }),
    }),
    updateSchoolNews: builder.mutation({
      query: ({ id, updatedSchoolNews }) => ({
        url: `${BLOG_URL}/school-news/${id}`,
        method: "PUT",
        body: updatedSchoolNews,
      }),
    }),
    deleteSchoolNews: builder.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/school-news/${id}`,
        method: "DELETE",
      }),
    }),

    // Events Endpoints
    getAllEvents: builder.query({
      query: () => ({
        url: `${BLOG_URL}/events`,
      }),
    }),
    createEvents: builder.mutation({
      query: (newEvent) => ({
        url: `${BLOG_URL}/events`,
        method: "POST",
        body: newEvent,
      }),
    }),
    getSpecificEvent: builder.query({
      query: (id) => ({
        url: `${BLOG_URL}/events/${id}`,
      }),
    }),
    updateEvents: builder.mutation({
      query: ({ id, updatedEvent }) => ({
        url: `${BLOG_URL}/events/${id}`,
        method: "PUT",
        body: updatedEvent,
      }),
    }),
    deleteEvents: builder.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/events/${id}`,
        method: "DELETE",
      }),
    }),

    // Academic Guidance Endpoints
    getAllAcademicGuidance: builder.query({
      query: () => ({
        url: `${BLOG_URL}/academic-guidance`,
      }),
    }),
    createAcademicGuidance: builder.mutation({
      query: (newGuidance) => ({
        url: `${BLOG_URL}/academic-guidance`,
        method: "POST",
        body: newGuidance,
      }),
    }),
    getSpecificAcademicGuidance: builder.query({
      query: (id) => ({
        url: `${BLOG_URL}/academic-guidance/${id}`,
      }),
    }),
    updateAcademicGuidance: builder.mutation({
      query: ({ id, updatedGuidance }) => ({
        url: `${BLOG_URL}/academic-guidance/${id}`,
        method: "PUT",
        body: updatedGuidance,
      }),
    }),
    deleteAcademicGuidance: builder.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/academic-guidance/${id}`,
        method: "DELETE",
      }),
    }),

    // Highlights Endpoints
    getAllHighlights: builder.query({
      query: () => ({
        url: `${BLOG_URL}/highlights`,
      }),
    }),
    createHighlight: builder.mutation({
      query: (newHighlight) => ({
        url: `${BLOG_URL}/highlights`,
        method: "POST",
        body: newHighlight,
      }),
    }),
    getSpecificHighlight: builder.query({
      query: (id) => ({
        url: `${BLOG_URL}/highlights/${id}`,
      }),
    }),
    updateHighlight: builder.mutation({
      query: ({ id, updatedHighlight }) => ({
        url: `${BLOG_URL}/highlights/${id}`,
        method: "PUT",
        body: updatedHighlight,
      }),
    }),
    deleteHighlight: builder.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/highlights/${id}`,
        method: "DELETE",
      }),
    }),

    // Fun Content Endpoints
    getAllFunContent: builder.query({
      query: () => ({
        url: `${BLOG_URL}/fun-content`,
      }),
    }),
    createFunContent: builder.mutation({
      query: (newFunContent) => ({
        url: `${BLOG_URL}/fun-content`,
        method: "POST",
        body: newFunContent,
      }),
    }),
    getSpecificFunContent: builder.query({
      query: (id) => ({
        url: `${BLOG_URL}/fun-content/${id}`,
      }),
    }),
    updateFunContent: builder.mutation({
      query: ({ id, updatedFunContent }) => ({
        url: `${BLOG_URL}/fun-content/${id}`,
        method: "PUT",
        body: updatedFunContent,
      }),
    }),
    deleteFunContent: builder.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/fun-content/${id}`,
        method: "DELETE",
      }),
    }),

    // Image Upload Endpoint
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  // School News Hooks
  useGetAllSchoolNewsQuery,
  useCreateSchoolNewsMutation,
  useGetSpecificNewsQuery,
  useUpdateSchoolNewsMutation,
  useDeleteSchoolNewsMutation,

  // Events Hooks
  useGetAllEventsQuery,
  useCreateEventsMutation,
  useGetSpecificEventQuery,
  useUpdateEventsMutation,
  useDeleteEventsMutation,

  // Academic Guidance Hooks
  useGetAllAcademicGuidanceQuery,
  useCreateAcademicGuidanceMutation,
  useGetSpecificAcademicGuidanceQuery,
  useUpdateAcademicGuidanceMutation,
  useDeleteAcademicGuidanceMutation,

  // Highlights Hooks
  useGetAllHighlightsQuery,
  useCreateHighlightMutation,
  useGetSpecificHighlightQuery,
  useUpdateHighlightMutation,
  useDeleteHighlightMutation,

  // Fun Content Hooks
  useGetAllFunContentQuery,
  useCreateFunContentMutation,
  useGetSpecificFunContentQuery,
  useUpdateFunContentMutation,
  useDeleteFunContentMutation,

  // Image Upload Hook
  useUploadImageMutation,
} = blogApiSlice;
