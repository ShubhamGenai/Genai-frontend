import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ GET Courses
export const fetchCourses = createAsyncThunk("data/fetchCourses", async () => {
  const response = await axios.get("http://localhost:5000/api/courses");
  return response.data;
});

// ✅ GET Tests
export const fetchTests = createAsyncThunk("data/fetchTests", async () => {
  const response = await axios.get("http://localhost:5000/api/tests");
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
