import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Selections } from '../../types';

interface ContactState {
	selections: Selections;
	isExpanded: boolean;
	isSaved: boolean;
}

const initialState: ContactState = {
	selections: {
		contactDetails: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		},
		fulfillmentType: '',
		specialInstructions: '',
		pickupPerson: '',
		pickupPersonDetails: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		},
		pickupDate: '',
		pickupDateSelection: null,
		storeDetails: {
			storeCity: '',
			storeState: '',
			storeNumber: 0,
			storeStreet: '',
			storeZip: '',
		},
		deliveryAddress: '',
		deliveryDate: '',
		deliveryTime: '',
		deliveryPhone: '',
		deliveryDetails: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zip: '',
			locationName: '',
		},
		deliveryTimeSlot: '',
	},
	isExpanded: true,
	isSaved: false,
};

const contactSlice = createSlice({
	name: 'contactDetails',
	initialState,
	reducers: {
		setExpanded: (state, action: PayloadAction<boolean>) => {
			state.isExpanded = action.payload;
		},
		setSaved: (state, action: PayloadAction<boolean>) => {
			state.isSaved = action.payload;
		},
		updateSelections: (state, action: PayloadAction<Partial<Selections>>) => {
			state.selections = { ...state.selections, ...action.payload };
		},
	},
});

export const { setExpanded, setSaved, updateSelections } =
	contactSlice.actions;
export default contactSlice.reducer;
