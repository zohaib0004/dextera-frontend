/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "../services/profileService";

// Get user from localStorage

const initialState = {
	profile: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// isFirmReg user
export const getProfile = createAsyncThunk("/get-profile", async (thunkAPI) => {
	try {
		return await profileService.getProfile();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		resetReset: (state) => {
			state.isFirm = false;
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
		},
		resetProfileError: (state) => {
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// get profile reducers
			.addCase(getProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload;
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.profile = null;
			});
	},
});

export const { resetReset, resetProfileError } = profileSlice.actions;
export default profileSlice.reducer;
