export interface ContactDetails {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

export interface FulfillmentSelections {
	fulfillmentType: string;
	specialInstructions: string;
	pickupPerson: string;
	pickupPersonDetails: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	};
	pickupDate: string;
	pickupDateSelection: string | null;
	storeDetails: {
		storeCity: string;
		storeState: string;
		storeNumber: number;
		storeStreet: string;
		storeZip: string;
	};
	deliveryAddress: string;
	deliveryDate: string;
	deliveryTime: string;
	deliveryPhone: string;
	deliveryDetails: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		address1: string;
		address2?: string;
		city: string;
		state: string;
		zip: string;
		locationName?: string;
	};
	deliveryTimeSlot: string;
}

export type UserType = {
	layoutType: 'PRO' | 'DIY';
};
