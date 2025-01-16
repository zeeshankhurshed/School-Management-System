import { apiSlice } from "./apiSlice";
import { FEE_URL } from "../constant";


export const feeApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllFees:builder.query({
            query:()=>({
                url:`${FEE_URL}`,
            }),
        }),
        createFee:builder.mutation({
            query:(newResult)=>({
                url:`${FEE_URL}`,
                method:"POST",
                body:newResult,
            }),
        }),
        getSpecificStudentFee:builder.query({
            query:(id)=>({
                url:`${FEE_URL}/${id}`,
            }),
        }),
        updateFee:builder.mutation({
            query:({id,updatedFee})=>({
                url:`${FEE_URL}/${id}`,
                method:"PUT",
                body:updatedFee,
            }),
        }),
        deleteFee:builder.mutation({
            query:(id)=>({
                url:`${FEE_URL}/${id}`,
                method:"DELETE",
            }),
        }),
    }),
});

export const {
    useCreateFeeMutation,
    useDeleteFeeMutation,
    useGetAllFeesQuery,
    useGetSpecificStudentFeeQuery,
    useUpdateFeeMutation,
}=feeApiSlice;