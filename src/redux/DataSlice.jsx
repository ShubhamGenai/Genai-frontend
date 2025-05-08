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

export const fetchCourseById =createAsyncThunk("data/fetchCourseById",
 async (id) => {
  const response = await axios.get(`${USERENDPOINTS.GETCOURSESBYID}/${id}`);


  
  return response.data;
});

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



export const fetchModulesByIds = createAsyncThunk(
  'modules/fetchByIds',
  async (moduleIds, { rejectWithValue }) => {
    try {
      if (!Array.isArray(moduleIds)) {
        throw new Error('moduleIds should be an array');
      }

      console.log('Sending moduleIds:', moduleIds); // ← ✅ Should log array of strings

      const response = await axios.post(
        USERENDPOINTS.GET_MODULES_DETAILS,
        { moduleIds }, // ← This is correct
        {
          headers: {
            'Content-Type': 'application/json', // ← Ensures backend can parse JSON
          },
        }
      );


      return response.data.modules
    } catch (err) {
      console.error('Fetch error:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data || 'Error fetching modules');
    }
  }
);


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

export const fetchLatestCoursesAndTests = createAsyncThunk(
  "data/fetchLatestCoursesAndTests", 
  async () => {
    const response = await axios.get(`${USERENDPOINTS.GET_LATEST_COURSES_AND_TESTS}`);
    return response.data; // Return both courses and tests in one object
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    courses: [],
    tests: [],
    categories:[],
    moduledata: [],
    latestCourses: [],  // To store latest courses
    latestTests: [], 
    testDetails: null,
    courseDetails: null,
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

      // ✅ Handle Course Fetch by ID

      .addCase(fetchCourseById.pending, (state) => {
        state.status = "loading";
      
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courseDetails = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
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
      })

      //modules fetching
      .addCase(fetchModulesByIds.pending,(state) => {
        state.status = "loading";
      } )
      .addCase(fetchModulesByIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.moduledata = action.payload;
      })
      .addCase(fetchModulesByIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchLatestCoursesAndTests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLatestCoursesAndTests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.latestCourses = action.payload.courses;
        state.latestTests = action.payload.tests;
      })
      .addCase(fetchLatestCoursesAndTests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })



   
  },
});

export default dataSlice.reducer;
