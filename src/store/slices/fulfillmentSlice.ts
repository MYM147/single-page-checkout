import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Selections } from '../../types';

interface FulfillmentState {
	selections: Selections;
	fulfillmentType: 'pickup' | 'delivery';
	isSaved: boolean;
	isExpanded: boolean;
	isLoading: boolean;
	membershipType: 'PRO' | 'DIY';
	savedAddressSelected: boolean;
}

const initialState: FulfillmentState = {
	selections: {
		deliveryDetails: {
			address1: '',
			address2: '',
			city: '',
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			state: '',
			zip: '',
		},
		deliveryDate: '',
		deliveryTime: '',
		deliveryTimeSlot: '',
		pickupDate: '',
		pickupDateSelection: '',
		pickupPerson: '',
		pickupPersonDetails: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
		},
		fulfillmentType: '',
		specialInstructions: '',
		storeDetails: {
			storeCity: '',
			storeNumber: 0,
			storeState: '',
			storeStreet: '',
			storeZip: '',
		},
		deliveryAddress: '',
		deliveryPhone: '',
		contactDetails: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		},
	},
	fulfillmentType: 'pickup',
	isExpanded: true,
	isLoading: false,
	isSaved: false,
	membershipType: 'PRO',
	savedAddressSelected: false,
};

const fulfillmentSlice = createSlice({
	name: 'fulfillment',
	initialState,
	reducers: {
		setFulfillmentType: (
			state,
			action: PayloadAction<'pickup' | 'delivery'>
		) => {
			state.fulfillmentType = action.payload;
		},
		updateSelections: (state, action: PayloadAction<Partial<Selections>>) => {
			state.selections = { ...state.selections, ...action.payload };
		},
		updateDeliveryDetails: (
			state,
			action: PayloadAction<Partial<Selections['deliveryDetails']>>
		) => {
			state.selections.deliveryDetails = {
				...state.selections.deliveryDetails,
				...action.payload,
			};
		},
		setSaved: (state, action: PayloadAction<boolean>) => {
			state.isSaved = action.payload;
		},
		setExpanded: (state, action: PayloadAction<boolean>) => {
			state.isExpanded = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setMembershipType: (state, action: PayloadAction<'PRO' | 'DIY'>) => {
			state.membershipType = action.payload;
		},
		setSavedAddressSelected: (state, action: PayloadAction<boolean>) => {
			state.savedAddressSelected = action.payload;
		},
	},
});

export const {
	setFulfillmentType,
	updateSelections,
	updateDeliveryDetails,
	setSaved,
	setExpanded,
	setLoading,
	setMembershipType,
	setSavedAddressSelected,
} = fulfillmentSlice.actions;

export default fulfillmentSlice.reducer;
