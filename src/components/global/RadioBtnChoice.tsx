import { Input, Radio, Tooltip } from '@prism/dropcloth';
import { useState } from 'react';

type Props = {
	name: string;
	name2: string;
	option: string;
	option2: string;
	text?: string;
	title: string;
	value: string;
	value2: string;
};

const getDates = () => {
	const dates = [];

	for (let i = 0; i < 7; i++) {
		const date = new Date();
		date.setDate(date.getDate() + i);
		dates.push(
			date.toLocaleDateString('en-US', {
				weekday: 'long',
				month: 'short',
				day: 'numeric',
			})
		);
	}
	return dates;
};

const RadioBtnChoice = ({
	name,
	name2,
	option,
	option2,
	text,
	title,
	value,
	value2,
}: Props) => {
	const [selectedOption, setSelectedOption] = useState('');
	const weekDates = getDates();

	console.log(
		'Selected Option:',
		selectedOption,
		'Name2:',
		name2,
		'Value2:',
		value2
	);

	return (
		<div className='swdc-mt-6'>
			<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>{title}</h3>
			{text && <p className='swdc-mt-2'>{text}</p>}
			<div className='swdc-pt-2'>
				<Radio
					name={`${name}`}
					value={`${value}`}
					onChange={(e) => setSelectedOption(e.target.value)}
					className='hover:swdc-bg-[#fff]'>
					{option}
				</Radio>
				<br />
				<Radio
					name={`${name2}`}
					value={`${value2}`}
					onChange={(e) => setSelectedOption(e.target.value)}
					className='hover:swdc-bg-[#fff]'>
					{option2}
				</Radio>

				{/* Pick Up Person Conditional Render */}
				{name2 === 'pickup-person' && selectedOption === 'someone-else' && (
					<>
						<div className='swdc-grid swdc-grid-cols-2 swdc-gap-2 swdc-mt-4'>
							<div>
								First Name
								<br />
								<Input
									name='First name'
									className='swdc-p-2 swdc-mt-1 swdc-h-6 swdc-w-[285px]'
								/>
							</div>
							<div>
								Last Name
								<br />
								<Input
									name='Last name'
									className='swdc-p-2 swdc-mt-1 swdc-h-6 swdc-w-[285px]'
								/>
							</div>
							<div>
								Email Address
								<br />
								<Input
									name='Email'
									className='swdc-p-2 swdc-mt-1 swdc-h-6 swdc-w-[285px]'
								/>
							</div>
							<div>
								Phone Number
								<br />
								<Input
									name='Phone'
									className='swdc-p-2 swdc-mt-1 swdc-h-6 swdc-w-[285px]'
								/>
							</div>
						</div>
					</>
				)}

				{/* Pickup Date Conditional Render */}
				{name2 === 'pickup-date' && selectedOption === 'on-a-specific-day' && (
					<>
						<div className='swdc-flex swdc-flex-row swdc-gap-1 swdc-mt-4'>
							{weekDates.map((date, index) => (
								<div
									key={index}
									className='swdc-flex swdc-flex-col swdc-items-center'>
									<span className=' swdc-mb-1 swdc-text-sm'>
										{index === 0
											? 'Today'
											: index === 1
											? 'Tomorrow'
											: new Date(date).toLocaleDateString('en-US', {
													weekday: 'long',
											})}
									</span>
									<div className='swdc-w-[80px] swdc-h-[68px] swdc-bg-white swdc-border swdc-border-[#2F2F30]/[0.45] swdc-rounded-[2px] swdc-flex swdc-flex-col swdc-items-center swdc-justify-center swdc-p-2 hover:swdc-bg-[#2F2F30] hover:swdc-text-[#fff]'>
										<span className='swdc-font-medium swdc-text-sm'>
											{new Date(date).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
											})}
										</span>
									</div>
								</div>
							))}
						</div>
						<p className='swdc-mt-2'>Two hours after store opens.</p>
						<Tooltip
							offsetValue={5}
							placement='bottom-start'
							polarity='light'
							tooltip='No available times.'>
							<span className='swdc-font-medium'>View store hours &gt;</span>
						</Tooltip>
					</>
				)}
			</div>
		</div>
	);
};

export default RadioBtnChoice;