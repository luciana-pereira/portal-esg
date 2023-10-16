import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface portalEsgDataState {
    selectedEvent: string;
    userType: string;
}

const initialState: portalEsgDataState = {
    selectedEvent: '',
    userType: '',
};

export const portalEsgDataSlice = createSlice({
    name: "portalEsgData",
    initialState,
    reducers: {
        setSelectedEvent: (state, action: PayloadAction<string>) => {
            state.selectedEvent = action.payload;
        },
        setUserType: (state, action: PayloadAction<string>) => {
            state.userType = action.payload;
        },
    },
});

export const {
    setSelectedEvent,
    setUserType,
} = portalEsgDataSlice.actions;

export default portalEsgDataSlice.reducer;
