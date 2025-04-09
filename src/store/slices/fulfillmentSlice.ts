import { FulfillmentSelections } from '../../types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FulfillmentState {
	fulfillmentType: 'pickup' | 'delivery';
	isExpanded: boolean;
	isLoading: boolean;
	isSaved: boolean;
	membershipType: 'PRO' | 'DIY';
	savedAddressSelected: boolean;
	selections: FulfillmentSelections;
}

const initialState: FulfillmentState = {
	selections: {
		deliveryAddress: '',
		deliveryDate: '',
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
		deliveryPhone: '',
		deliveryTime: '',
		deliveryTimeSlot: '',
		fulfillmentType: '',
		pickupDate: '',
		pickupDateSelection: '',
		pickupPerson: '',
		pickupPersonDetails: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
		},
		specialInstructions: '',
		storeDetails: {
			storeCity: '',
			storeNumber: 0,
			storeState: '',
			storeStreet: '',
			storeZip: '',
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
		updateSelections: (
			state,
			action: PayloadAction<Partial<FulfillmentSelections>>
		) => {
			state.selections = { ...state.selections, ...action.payload };
		},
		updateDeliveryDetails: (
			state,
			action: PayloadAction<Partial<FulfillmentSelections['deliveryDetails']>>
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
