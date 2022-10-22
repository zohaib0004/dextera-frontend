/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSubscribe: false,
};

export const subSlice = createSlice({
	name: "isSubscribe",
	initialState,
	reducers: {
		subreset: (state) => {
			state.isSubscribe = false;
		},
		setSubscription: (state) => {
			state.isSubscribe = true;
		},
		unSetSubscription: (state) => {
			state.isSubscribe = false;
		},
	},
});

export const { subreset, setSubscription, unSetSubscription } =
	subSlice.actions;
export default subSlice.reducer;
