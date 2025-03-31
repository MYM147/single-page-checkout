import { configureStore } from '@reduxjs/toolkit';
import fulfillmentReducer from './slices/fulfillmentSlice';

export const store = configureStore({
	reducer: {
		fulfillment: fulfillmentReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
