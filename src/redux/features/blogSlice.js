import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createBlog = createAsyncThunk(
  // action
  "blog/createBlog",
  async ({ updatedBlogData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createBlog(updatedBlogData);
      toast.success("Blog Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getBlog();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const particularBlog = createAsyncThunk(
  "blog/particularBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.particularBlog(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBlogByUser = createAsyncThunk(
  "blog/getBlogByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getBlogByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteBlog(id);
      toast.success("Blog Delete Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, updatedBlogData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateBlog(updatedBlogData, id);
      toast.success("Blog Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blog: {},
    blogs: [],
    userBlogs: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [createBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = [action.payload];
    },
    [createBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    },
    [getBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [particularBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [particularBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blog = action.payload;
    },
    [particularBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getBlogByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlogByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userBlogs = action.payload;
    },
    [getBlogByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userBlogs = state.userBlogs.filter((item) => item._id !== id);
        state.blogs = state.blogs.filter((item) => item._id !== id);
      }
    },
    [deleteBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [updateBlog.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userBlogs = state.userBlogs.map((item) =>
          item._id === id ? action.payload : item
        );
        state.blogs = state.blogs.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default blogSlice.reducer;
