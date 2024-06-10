import { useSelector } from "react-redux";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { setIsOpen, setIsNavigate, setHasError } from "./portalEsgDataSlice";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { RootState } from "../store"
import { db } from "../../services/firebase";
import { error } from "console";

interface AuthState {
    user: {
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
    } | null;
}
  
const initialState: AuthState = {
    user: null,
};

interface SignupData {
    usertype: string;
    photoURL: string;
	nickname: string;
	displayName: string;
	familyName: string;
	email: string;
	password: string;
	femaleBiologicalGender: boolean;
	maleBiologicalGender: boolean;
	dataOfBirth: string;
	privacyPolicy: boolean;
	responsibility: string;
}

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { dispatch }) => {
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            dispatch(setIsNavigate(true));
            return user;
        } catch (error: any) {
            console.error("Error", error.code, error.message);
            dispatch(setIsOpen(true));
            throw error;
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ data, userType }: { data: SignupData, userType: string}, { dispatch }) => {
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            //const userType = useSelector((state: RootState) => state.portalEsgDataSlice.userType);
            await setDoc(doc(db, userType, user.uid), { ...data, uid: user.uid });
            dispatch(setIsOpen(true));
            setTimeout(() => {
                dispatch(setIsNavigate(true));
            }, 5000);
            return user;
        } catch (error: any) {
            console.error("Error", error.code, error.message);
            dispatch(setIsOpen(true));
            dispatch(setHasError(true));
            throw error;
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  const auth = getAuth();
  await signOut(auth);
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        });
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        });
        builder.addCase(logout.fulfilled, (state) => {
        state.user = null;
        });
    },
});

export default authSlice.reducer;
