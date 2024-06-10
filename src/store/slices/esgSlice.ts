import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
import { collection, getDocs, addDoc, query, orderBy, limit } from 'firebase/firestore';

interface ESGData {
  userId: string;
  points: number;
  description: string;
  fileURL: string;
  createdAt: any;
  id: string;
}

interface ESGState {
  ranking: ESGData[];
  content: ESGData[];
  loading: boolean;
}

const initialState: ESGState = {
  ranking: [],
  content: [],
  loading: false,
};

export const fetchRanking = createAsyncThunk('esg/fetchRanking', async () => {
  const q = query(collection(db, 'esgPoints'), orderBy('points', 'desc'), limit(3));
  const querySnapshot = await getDocs(q);
  let ranking: ESGData[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    ranking.push({
      ...data,
      id: doc.id,
    } as ESGData);
  });
  return ranking;
});

export const addEsgContent = createAsyncThunk(
  'esg/addEsgContent',
  async ({ userId, description, fileURL }: { userId: string; description: string; fileURL: string }) => {
    const docRef = await addDoc(collection(db, 'esgPoints'), {
      userId,
      points: 10,
      description,
      fileURL,
      createdAt: new Date(),
    });
    return { userId, description, fileURL, id: docRef.id, points: 10, createdAt: new Date() } as ESGData;
  }
);

const esgSlice = createSlice({
  name: 'esg',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRanking.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRanking.fulfilled, (state, action: PayloadAction<ESGData[]>) => {
      state.ranking = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRanking.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addEsgContent.fulfilled, (state, action: PayloadAction<ESGData>) => {
      state.content.push(action.payload);
    });
  },
});

export default esgSlice.reducer;
