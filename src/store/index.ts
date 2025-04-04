import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import fulfillmentReducer from './slices/fulfillmentSlice';

export const store = configureStore({
	reducer: {
		fulfillment: fulfillmentReducer,
		contact: contactReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
