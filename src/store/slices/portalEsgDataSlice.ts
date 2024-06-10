import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface portalEsgDataState {
    selectedEvent: string;
    userType: string;
    isOpen: boolean;
    isNavigate: boolean;
    hasError: boolean;
}

const initialState: portalEsgDataState = {
    selectedEvent: '',
    userType: '',
    isOpen: false,
    isNavigate: false,
    hasError: false,
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
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setIsNavigate: (state, action: PayloadAction<boolean>) => {
            state.isNavigate = action.payload;
        },
        setHasError: (state, action: PayloadAction<boolean>) => {
            state.hasError = action.payload;
        },
    },
});

export const {
    setSelectedEvent,
    setUserType,
    setIsOpen,
    setIsNavigate,
    setHasError,
} = portalEsgDataSlice.actions;

export default portalEsgDataSlice.reducer;
