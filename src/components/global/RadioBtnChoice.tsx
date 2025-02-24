import { Input, Radio, Tooltip } from '@prism/dropcloth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
		<div className="swdc-mt-6">
			<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">{title}</h3>
			{text && <p className="swdc-mt-2">{text}</p>}
			<div className="swdc-pt-2">
				<Radio
					className="hover:swdc-bg-[#fff]"
					onChange={(e) => setSelectedOption(e.target.value)}
					name={`${name}`}
					value={`${value}`}
				>
					{option}
				</Radio>
				<br />
				<Radio
					className="hover:swdc-bg-[#fff]"
					onChange={(e) => setSelectedOption(e.target.value)}
					name={`${name2}`}
					value={`${value2}`}
				>
					{option2}
				</Radio>

				{/* Pick Up Person Conditional Render */}
				{name2 === 'pickup-person' && selectedOption === 'someone-else' && (
					<>
						<div className="swdc-mt-2 swdc-grid swdc-grid-cols-2 swdc-gap-2">
							<div>
								First Name *
								<br />
								<Input
									className="swdc-mt-1 swdc-h-6 swdc-w-[285px] swdc-p-2"
									name="First name"
								/>
							</div>
							<div>
								Last Name *
								<br />
								<Input
									className="swdc-mt-1 swdc-h-6 swdc-w-[285px] swdc-p-2"
									name="Last name"
								/>
							</div>
							<div>
								Email Address *
								<br />
								<Input
									className="swdc-mt-1 swdc-h-6 swdc-w-[285px] swdc-p-2"
									name="Email"
								/>
							</div>
							<div>
								Phone Number *
								<br />
								<Input
									className="swdc-mt-1 swdc-h-6 swdc-w-[285px] swdc-p-2"
									name="Phone"
								/>
							</div>
						</div>
					</>
				)}

				{/* Pickup Date Conditional Render */}
				{name2 === 'pickup-date' && selectedOption === 'on-a-specific-day' && (
					<>
						<div className="swdc-mt-2 swdc-flex swdc-flex-row swdc-gap-1">
							{weekDates.map((date, index) => (
								<div
									key={index}
									className="swdc-flex swdc-flex-col swdc-items-center"
								>
									<span className="swdc-mb-1 swdc-text-sm">
										{' '}
										{date}
										{index === 0
											? 'Today'
											: index === 1
												? 'Tomorrow'
												: new Date(date).toLocaleDateString('en-US', {
														weekday: 'long',
													})}
									</span>
									<div className="swdc-flex swdc-h-[68px] swdc-w-[80px] swdc-flex-col swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-bg-white swdc-p-2 hover:swdc-bg-[#2F2F30] hover:swdc-text-[#fff]">
										<span className="swdc-text-sm swdc-font-medium">
											{new Date(date).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
											})}
										</span>
									</div>
								</div>
							))}
						</div>
						<p className="swdc-mt-2">Two hours after store opens.</p>
						<Tooltip
							offsetValue={5}
							placement="bottom-start"
							polarity="light"
							tooltip="No available times."
						>
							<span className="swdc-font-medium">View store hours &gt;</span>
						</Tooltip>
					</>
				)}
			</div>
		</div>
	);
};

export default RadioBtnChoice;
