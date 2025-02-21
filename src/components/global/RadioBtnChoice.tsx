import { Radio } from '@prism/dropcloth';

interface Props {
	name?: string;
	name2?: string;
	option: string;
	option2: string;
	title: string;
	text?: string;
	value?: string;
	value2?: string;
}

const RadioBtnChoice = ({name, name2, option, option2, text, title, value, value2}: Props) => {
	return (
		<div className='swdc-mt-6'>
			<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>{title}</h3>
			{text && <p className='swdc-mt-2'>{text}</p>}
			<div className='swdc-pt-2'>
				<Radio
					name={`${name}`}
					value={`${value}`}
					className='hover:swdc-bg-[#fff]'>
					{option}
				</Radio>
				<br />
				<Radio
					name={`${name2}`}
					value={`${value2}`}
					className='hover:swdc-bg-[#fff]'>
					{option2}
				</Radio>
			</div>
		</div>
	);
};

export default RadioBtnChoice;
