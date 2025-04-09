import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { USERENDPOINTS } from "../constants/ApiConstants";


const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

// Async thunk to add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ itemId, itemType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        USERENDPOINTS.ADD_TO_CART,
        { itemId, itemType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart!");
      return res.data.cart;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ✅ Check if item is in cart
export const checkItemInCart = createAsyncThunk(
    "cart/checkItemInCart",
    async ({ itemId, itemType }, thunkAPI) => {
      try {
        const res = await axios.get(
          `${USERENDPOINTS.CHECK_CART}?itemId=${itemId}&itemType=${itemType}`,
          getAuthHeader()
        );
        return res.data.inCart;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
      }
    }
  );



  export const getCartTests = createAsyncThunk("cart/getCartTests", async (_, thunkAPI) => {
    try {
      const res = await axios.get(USERENDPOINTS.GET_CART_TEST, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.tests; // assume this is the array of tests
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  });
  
  export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ itemId, itemType = "test" }, thunkAPI) => {
      try {
        await axios.delete(`${USERENDPOINTS.REMOVE_FROM_CART}`, {
          data: { itemId, itemType },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return itemId;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
      }
    }
  );

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartTests:[],
    isInCart: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetCartStatus: (state) => {
      state.isInCart = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload; // backend should return updated cart
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkItemInCart.fulfilled, (state, action) => {
        state.isInCart = action.payload;
      })
      .addCase(getCartTests.fulfilled, (state, action) => {
        state.cartTests = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartTests = state.cartTests.filter(test => test._id !== action.payload);
      });
  },
});

export const { resetCartStatus } = cartSlice.actions;
export default cartSlice.reducer;
