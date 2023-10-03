
import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: false,
    reducers: {
        onLoading: () => {
            return true
        },
        offLoading: () => {
            return false
        }
    }
})

export default loadingSlice.reducer;
export const { onLoading, offLoading} = loadingSlice.actions;