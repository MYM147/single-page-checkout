export type TimeSlot = {
	courierType: 'Sherwin-Williams Delivery' | 'Local Courier';
	text: string;
	title: string;
	value: string;
};

export const proTimeSlots: TimeSlot[] = [
	{
		courierType: 'Sherwin-Williams Delivery',
		text: 'Standard delivery',
		title: '7AM - 8AM',
		value: 'sw-morning-7-8',
	},
	{
		courierType: 'Sherwin-Williams Delivery',
		text: 'Standard delivery',
		title: '8AM - 9AM',
		value: 'sw-afternoon-8-9',
	},
	{
		courierType: 'Sherwin-Williams Delivery',
		text: 'Standard delivery',
		title: '9AM - 10AM',
		value: 'sw-afternoon-9-10',
	},
	{
		courierType: 'Sherwin-Williams Delivery',
		text: 'Standard delivery',
		title: '1PM - 3PM',
		value: 'sw-afternoon-1-3',
	},
	{
		courierType: 'Sherwin-Williams Delivery',
		text: 'Standard delivery',
		title: '1PM - 3PM',
		value: 'sw-afternoon-1-3',
	},
	{
		courierType: 'Sherwin-Williams Delivery',
		text: 'Standard delivery',
		title: '1PM - 3PM',
		value: 'sw-afternoon-1-3',
	},
	{
		courierType: 'Sherwin-Williams Delivery',
		text: 'Standard delivery',
		title: '1PM - 3PM',
		value: 'sw-afternoon-1-3',
	},
	{
		courierType: 'Local Courier',
		text: 'Standard delivery',
		title: '7AM - 11AM',
		value: 'local-morning-7-11',
	},
	{
		courierType: 'Local Courier',
		text: 'Standard delivery',
		title: '7AM - 11AM',
		value: 'local-morning-7-11',
	},
	{
		courierType: 'Local Courier',
		text: 'Standard delivery',
		title: '7AM - 11AM',
		value: 'local-morning-7-11',
	},
	{
		courierType: 'Local Courier',
		text: 'Standard delivery',
		title: '8AM - 12PM',
		value: 'local-morning-8-12',
	},
	{
		courierType: 'Local Courier',
		text: 'Standard delivery',
		title: '7PM - 9PM',
		value: 'local-afternoon-7-9',
	},
	{
		courierType: 'Local Courier',
		text: 'Standard delivery',
		title: '2PM - 6PM',
		value: 'local-afternoon-2-6',
	},
];
