export const saveOrderDetails = (section: string, data: any) => {
	fetch('/api/orderDetails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			section,
			data,
		}),
	});
};
