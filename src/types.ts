export interface Selections {
	// Shared properties
	fulfillmentType: string;
	specialInstructions: string;

	// Pickup properties
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

	// Delivery properties
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
	};
	deliveryTimeSlot: string;
}
