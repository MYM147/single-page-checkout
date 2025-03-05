export const getDates = () => {
	const dates = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date();
		date.setDate(date.getDate() + i);

		dates.push(date);
	}
	return dates;
};

export const weekDates = getDates();
