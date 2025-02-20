type Props = {
	title: string;
};

const SectionTitle = ({title}: Props) => {
	return (
		<h2 className='swdc-text-[22px] swdc-font-bold swdc-leading-6 swdc-tracking-[2px] swdc-uppercase swdc-pb-[40px]'>
			{title}
		</h2>
	);
};

export default SectionTitle;
