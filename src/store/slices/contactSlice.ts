import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactDetails } from '../../types';

interface ContactState {
	contactDetails: ContactDetails;
	isExpanded: boolean;
	isSaved: boolean;
}

const initialState: ContactState = {
	contactDetails: {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
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
		updateContactDetails: (
			state,
			action: PayloadAction<Partial<ContactDetails>>
		) => {
			state.contactDetails = { ...state.contactDetails, ...action.payload };
		},
	},
});

export const { setExpanded, setSaved, updateContactDetails } =
	contactSlice.actions;
export default contactSlice.reducer;
