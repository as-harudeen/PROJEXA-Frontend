import { createSlice } from "@reduxjs/toolkit";


const sideBar = createSlice({
    name: "sideBar",
    initialState: true,
    reducers: {
        openSideBar: () => true,
        closeSideBar: () => false
    }
})

export default sideBar.reducer;
export const { openSideBar, closeSideBar } = sideBar.actions;