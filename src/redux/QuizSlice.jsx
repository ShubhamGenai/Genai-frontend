// quizSlice.js (if using Redux Toolkit)
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { USERENDPOINTS } from '../constants/ApiConstants';

// Async thunk to fetch quizzes by IDs
export const fetchQuizzesByIds = createAsyncThunk(
  'quiz/fetchQuizzesByIds',
  async (quizIds, { rejectWithValue }) => {
    console.log(quizIds,"ids");
    
    try {
      const response = await axios.post(USERENDPOINTS.GET_QUIZ, { ids: quizIds });
      console.log(response.data,"my ");
      return response.data; // Should be an array of quiz objects
     
      
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
      quiz: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchQuizzesByIds.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchQuizzesByIds.fulfilled, (state, action) => {
          state.loading = false;
          state.quiz = action.payload; // array of quizzes
        })
        .addCase(fetchQuizzesByIds.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Something went wrong';
        });
    },
  });
  
  export default quizSlice.reducer;
  

