import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USERENDPOINTS } from "../constants/ApiConstants";



// ✅ GET Tests
export const fetchTests = createAsyncThunk("data/fetchTests", async () => {
  const response = await axios.get(USERENDPOINTS.GETTESTS);
  return response.data;
});

export const fetchTestById = createAsyncThunk(
  "data/fetchTestById",
  async (id) => {
    const response = await axios.get(`${USERENDPOINTS.GETTESTSBYID}/${id}`);
    return response.data;
  }
);

// ✅ GET Tests category
export const fetchTestsCategories = createAsyncThunk("data/fetchTestsCategories", async () => {
  const response = await axios.get(USERENDPOINTS.GETTEST_CATEGORIES);
  return response.data;
});

// ✅ GET Courses
export const fetchCourses = createAsyncThunk("data/fetchCourses", async () => {
  const response = await axios.get(USERENDPOINTS.GETCOURSES);
  return response.data;
});

// ✅ POST Course
export const addCourse = createAsyncThunk("data/addCourse", async (newCourse) => {
  const response = await axios.post("http://localhost:5000/api/courses", newCourse);
  return response.data;
});

// ✅ POST Test
export const addTest = createAsyncThunk("data/addTest", async (newTest) => {
  const response = await axios.post("http://localhost:5000/api/tests", newTest);
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    courses: [],
    tests: [],
    categories:[],
    testDetails: null,
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Handle Courses Fetch
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // ✅ Handle Tests Fetch
      .addCase(fetchTests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tests = action.payload;
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })


      .addCase(fetchTestById.pending, (state) => {
        state.status = "loading";
      
      })
      .addCase(fetchTestById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.testDetails = action.payload;
      })
      .addCase(fetchTestById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

     // ✅ Handle Tests Fetch categories
      .addCase(fetchTestsCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTestsCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchTestsCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ✅ Handle Adding Course
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      // ✅ Handle Adding Test
      .addCase(addTest.fulfilled, (state, action) => {
        state.tests.push(action.payload);
      });


   
  },
});

export default dataSlice.reducer;
