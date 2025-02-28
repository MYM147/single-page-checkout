export type Selections = {
	pickupPerson: string;
	pickupPersonDetails: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	};
	pickupDate: string;
	pickupDateSelection: string | null;
	specialInstructions: string;
	storeDetails: {
		storeCity: string;
		storeState: string;
		storeNumber: number;
		storeStreet: string;
		storeZip: string;
	};
};
